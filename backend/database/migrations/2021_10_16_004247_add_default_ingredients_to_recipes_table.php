<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDefaultIngredientsToRecipesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('recipes', function (Blueprint $table) {
            $table->string('first_ingredients')->nullable();
            $table->string('second_ingredients')->nullable();
            $table->string('third_ingredients')->nullable();
            $table->string('fourth_ingredients')->nullable();
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
            $table->dropColumn('first_ingredients');
            $table->dropColumn('second_ingredients');
            $table->dropColumn('third_ingredients');
            $table->dropColumn('fourth_ingredients');
        });
    }
}
