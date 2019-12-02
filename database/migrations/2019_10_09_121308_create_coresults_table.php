<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoresultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coresults', function (Blueprint $table) {
$table->bigIncrements('id');
            $table->unsignedBigInteger('item_id')->nullable();
            $table->unsignedBigInteger('corrector_id')->nullable();
            $table->text('mediafilename'); //tt ID For Text Test
            $table->text('mediafolder'); //TT ID for WORD TEST
            $table->text('precorrection'); // JSON 
            $table->text('results'); // ATTENTION FIX TO JSON IF NO BACKPACK CRUD
            $table->text('state');
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coresults');
    }
}
