<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserRecipeFavoritesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // TODO: レシピIDとuserIDでユニークキー制約をかける

        Schema::create('user_recipe_favorites', function (Blueprint $table) {
            if (!$table->integer('recipe_id' || $table->integer('user_id'))) {
                return redirect("/recipe");
            } else {
                $table->increments('id');
                $table->integer('recipe_id');
                $table->integer('user_id');
                $table->timestamps();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_recipe_favorites');
    }
}
