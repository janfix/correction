<?php

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->truncate();
        
        $permissions = [
            [
            'name'=>'Do correction',
            'guard_name'=>'web',
            ],
             [
            'name'=>'Do supervision',
            'guard_name'=>'web',
            ],
             [
            'name'=>'CRUD Role',
            'guard_name'=>'web',
            ],
             [
            'name'=>'CRUD Supervisor',
            'guard_name'=>'web',
            ],
             [
            'name'=>'CRUD Corrector',
            'guard_name'=>'web',
            ],
             [
            'name'=>'CRUD Correction',
            'guard_name'=>'web',
             ]
            ];
     
        DB::table('permissions')->insert($permissions);
    }
}
