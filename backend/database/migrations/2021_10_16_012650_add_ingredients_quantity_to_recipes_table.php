<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIngredientsQuantityToRecipesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('recipes', function (Blueprint $table) {
            $table->string('first_ingredient_quantitys')->nullable();
            $table->string('second_ingredient_quantitys')->nullable();
            $table->string('third_ingredient_quantitys')->nullable();
            $table->string('fourth_ingredient_quantitys')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('recipes', function (Blueprint $table) {
            $table->string('first_ingredient_quantitys')->nullable();
            $table->string('second_ingredient_quantitys')->nullable();
            $table->string('third_ingredient_quantitys')->nullable();
            $table->string('fourth_ingredient_quantitys')->nullable();
        });
    }
}
