<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\UserRecipeFavorite;

class RecipeController extends Controller
{

    public function top()
    {
        $favoriteRecipes = UserRecipeFavorite::where('user_id', Auth::id())->get();
        $favoriteRecipeIds = $favoriteRecipes->pluck('recipe_id')->toArray();
        $recipes = Recipe::with(['user'])->orderBy('created_at', 'desc')->paginate(6);

        foreach ($recipes as $recipe) {
            $recipe->isFavorite = in_array($recipe->id, $favoriteRecipeIds);
        }

        return response()->json(['recipes' => $recipes]);
    }


    public function show($id)
    {
        $recipe = Recipe::with(['recipe_ingredients', 'user'])->find($id);
        // dd($recipe);

        return response()->json(['recipe' => $recipe]);
        // return view('recipes/show', compact('recipe'));
    }

    public function about()
    {
        return view('recipes.about');
    }

    public function help()
    {
        return view('recipes.help');
    }

    public function search(Request $request)
    // public function search($title)
    {
        $recipes = Recipe::with(['user'])->where('title', 'like', "%{$request->title}%")->get();
        // dd($request->title);

        return response()->json(['recipes' => $recipes]);
        // return view('recipes.search', compact('recipes'));
    }

    public function ranking()
    {
        $recipes = Recipe::with(['user'])->orderBy('cost', 'asc')->get();
        return response()->json(['recipes' => $recipes]);
        // return view('recipes.ranking', compact('recipes'));
    }

    public function create()
    {
        return view('recipes.user.create');
    }

    public function index()
    {
        $user = Auth::user();
        // dd($user);
        $recipes = Recipe::with(['user'])->where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(5);

        return response()->json(['recipes' => $recipes]);
    }

    public function store(Request $request)
    {
        $this->validate($request, Recipe::$rules);

        if ($file = $request->image) {
            $fileName = time() . $file->getClientOriginalName();
            $target_path = public_path('/storage/image');
            var_dump($target_path);
            $file->move($target_path, $fileName);
        } else {
            $fileName = "";
        }
        $recipe = new Recipe;
        $recipe->fill($request->all());
        $recipe->user_id = Auth::id();
        $recipe->image = $fileName;
        // var_dump($recipe);
        DB::transaction(function () use ($recipe, $request) {
            // 更新処理
            $recipe->save();
            // dd($request->input('ingredients', []));
            var_dump($$request->input('ingredients', []));
            $recipe->recipe_ingredients()->createMany($request->input('ingredients', []));
        });

        // 成功時のレスポンス
        $response = [
            'isSuccess' => true,
            'message' => 'レシピの作成に成功しました'
        ];

        return response()->json(['response' => $response]);
    }

    public function upload(Request $request)
    {
        // validateがあると画像変更せずに更新するとエラーになる
        // $request->validate([
        //     'image' => 'required|file|image|mimes:png,jpeg'
        // ]);
        $upload_image = $request->file('image');
        // dd($upload_image);

        if ($upload_image) {
            //アップロードされた画像を保存する
            $path = $upload_image->store('public/image');
            //画像の保存に成功したらDBに記録する
            if ($path) {
                Recipe::create([
                    "file_name" => $upload_image->getClientOriginalName(),
                    "file_path" => $path
                ]);
            }
        } else {
            $path = $request->image->store('public/image');
            dd($path);
        }

        $response = [
            'isSuccess' => true,
            'message' => 'レシピ画像のアップロードに成功しました'
        ];
        return response()->json(['response' => $response]);
    }

    public function edit(Request $request)
    {
        $recipe = Recipe::with(['recipe_ingredients', 'user'])->find($request->id);
        // dd($recipe);
        return response()->json(['recipe' => $recipe]);
    }

    public function update(Request $request)
    {
        $this->validate($request, Recipe::$rules);
        foreach (range(0, 3) as $index) {
            $useName = $request->input('ingredients.*.name');
            $useAmount = $request->input('ingredients.*.amount');
        }
        $recipe = new Recipe;
        $recipe = Recipe::with(['recipe_ingredients'])->find($request->id);
        $recipe->fill($request->all());
        $recipe->user_id = Auth::id();
        $recipeForm = $request->all();

        // var_dump($recipeForm);
        if ($request->remove == 'true') {
            $recipeForm['image'] = null;
        } elseif ($request->file('image')) {
            // $path = $request->file('image')->store('public/image');
            // var_dump($path);
            // $recipeForm['image'] = basename($path);
            // var_dump($recipeForm['image']);
            $file = $request->image;
            $fileName = time() . $file->getClientOriginalName();
            $target_path = public_path('/storage/image');
            $file->move($target_path, $fileName);
            $recipeForm['image'] = $fileName;
        } else {
            $recipeForm['image'] = $recipe->image;
        }

        unset($recipeForm['remove']);
        unset($recipeForm['_token']);
        $recipe->fill($recipeForm);

        DB::transaction(function () use ($recipe, $request) {
            // 更新処理
            $recipe->save();
            $recipe->recipe_ingredients()->delete();
            $recipe->recipe_ingredients()->createMany($request->input('ingredients', []));
        });
        $response = [
            'isSuccess' => true,
            'message' => 'レシピの更新に成功しました'
        ];
        return response()->json(['response' => $response]);
    }


    public function delete(Request $request)
    {
        var_dump('request', $request);
        $recipe = Recipe::find($request->id);
        $recipe->delete();
        $response = [
            'isSuccess' => true,
            'message' => 'レシピの削除に成功しました'
        ];
        return response()->json(['response' => $response]);
    }

    public function favorites()
    {
        $userId = Auth::id();
        $recipes = Recipe::with(['user'])
            ->whereHas('favorite', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->get();
        return response()->json(['recipes' => $recipes]);
    }

    public function favorite(Request $request)
    {
        $favorite = new UserRecipeFavorite();
        $favorite->recipe_id = $request->recipe_id;
        // dd($request);
        $favorite->user_id = Auth::user()->id;
        $favorite->save();

        $response = [
            'isSuccess' => true,
            'message' => 'お気に入りレシピの保存に成功しました'
        ];
        return response()->json(['response' => $response]);
    }

    public function unfavorite(Request $request)
    {
        // TODO: user_idとrecipe_idが正しい値かバリデーションする
        //TODO: 片方でも欠けてれば400番エラーにする
        $recipe = UserRecipeFavorite::where('user_id', Auth::id())
            ->where(
                'recipe_id',
                $request->recipe_id
            );
        // var_dump($request->recipe_id);

        $recipe->delete();
        $response = [
            'isSuccess' => true,
            'message' => 'お気に入りレシピの削除に成功しました'
        ];

        return response()->json(['response' => $response]);
        // return redirect()->route('top');
    }
}
