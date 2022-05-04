<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRecipeFavorite extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'recipe_id', 'user_id'];

    public function recipe()
    {
        return $this->hasMany('App\Models\Recipe');
    }
}
