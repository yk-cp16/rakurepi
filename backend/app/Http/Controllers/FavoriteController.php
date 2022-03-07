<?php

namespace App\Http\Controllers;

use App\Models\UserRecipeFavorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{


    public function store(Request $request)
    {
        $favorite = new UserRecipeFavorite();
        $favorite->recipe_id = $request->recipe_id;
        // dd($request);
        $favorite->user_id = Auth::user()->id;
        $favorite->save();

        return redirect()->route('top');
    }

    public function destroy(Request $request, $id)
    {
        $recipe = UserRecipeFavorite::findOrFail($id);

        $recipe->favorite()->delete();
        return redirect()->route('top');
        // return redirect()->route('favorite', [$request->recipe_id]);
    }
}
