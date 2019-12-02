<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIteminfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('iteminfos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('mediapath');
            $table->text('corrname');
            $table->text('subject');
            $table->text('language');
            $table->text('level');
            $table->text('grade');
            $table->text('instructions');
            $table->text('content');
            $table->text('content_ref');
            $table->text('corrtype'); //simple or double ...else ?
            $table->text('itemtype'); //Text or word list!
            $table->text('Author');
            $table->text('Institution');
            $table->text('datestart');
            $table->text('test_session_id'); // How to link the results to the other results of the same test
            $table->text('docLink');
            $table->text('corrplan')->nullable();
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
        Schema::dropIfExists('iteminfos');
    }
}
