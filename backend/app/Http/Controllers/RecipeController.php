<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{

    public function top()
    {
        $recipes = Recipe::orderBy('created_at', 'desc')->paginate(6);
        return view('recipes.top', compact('recipes'));
    }


    public function show($id)
    {
        $recipe = Recipe::find($id);
        return view('recipes/show', compact('recipe'));
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
    {
        $recipes = Recipe::where('title', 'like', "%{$request->title}%")->get();
        return view('recipes.search', compact('recipes'));
    }

    public function ranking()
    {
        $recipes = Recipe::orderBy('cost', 'asc')->get();
        return view('recipes.ranking', compact('recipes'));
    }

    public function create()
    {
        return view('recipes.user.create');
    }

    public function index()
    {
        $user = Auth::user();
        $recipes = Recipe::where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(5);
        return view('user.index', compact('recipes'));
    }

    public function store(Request $request)
    {
        $this->validate($request, Recipe::$rules);
        if ($file = $request->image) {
            $fileName = time() . $file->getClientOriginalName();
            $target_path = public_path('/storage/image');
            $file->move($target_path, $fileName);
        } else {
            $fileName = "";
        }

        $recipe = new Recipe;
        $recipe->fill($request->all());
        $recipe->user_id = Auth::id();
        $recipe->image = $fileName;
        DB::transaction(function () use ($recipe, $request) {
            // 更新処理
            $recipe->save();
            $recipe->recipe_ingredients()->createMany($request->input('ingredients', []));
        });
        return redirect()->route('user.home');
    }

    function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|file|image|mimes:png,jpeg'
        ]);
        $upload_image = $request->file('image');

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
        }
        return redirect("/user");
    }

    public function edit(Request $request)
    {
        $recipe = Recipe::find($request->id);
        return view('recipes.user.edit', compact('recipe'));
    }

    public function update(Request $request)
    {
        $this->validate($request, Recipe::$rules);
        foreach (range(0, 3) as $index) {
            $useName = $request->input('ingredients.*.name');
            $useAmount = $request->input('ingredients.*.amount');
            if ($useName[$index] == null || $useAmount[$index] == null) return redirect("/user");
        }
        $recipe = new Recipe;
        $recipe = Recipe::find($request->id);
        $recipe->fill($request->all());
        $recipe->user_id = Auth::id();
        $recipeForm = $request->all();
        if ($request->remove == 'true') {
            $recipeForm['image'] = null;
        } elseif ($request->file('image')) {
            $path = $request->file('image')->store('public/image');
            $recipeForm['image'] = basename($path);
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
        return redirect()->route('user.home');
    }

    public function delete($id)
    {
        $recipe = Recipe::find($id);
        $recipe->delete();
        return redirect()->route('user.home');
    }

    public function account()
    {
        return view('user.account');
    }

    public function favorite()
    {
        return view('user.favorite');
    }

    public function menu()
    {
        return view('user.menu');
    }
}
