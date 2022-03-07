<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'user_id', 'title', 'description', 'image', 'cost'];

    public static $rules = [
        'image' => 'image|file',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function favorite()
    {
        // return $this->belongsTo('App\Models\Favorite');
        return $this->hasMany('App\Models\UserRecipeFavorite');
    }

    public function recipe_ingredients()
    {
        return $this->hasMany('App\Models\RecipeIngredient');
    }
}
