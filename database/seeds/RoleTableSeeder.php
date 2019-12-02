<?php

use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('role')->truncate();
        
        $role = [
                [
                'name'=>'Admin',
                'guard_name'=>'web'
                ],
                [
                'name'=>'Corrector',
                'guard_name'=>'web'
                ],
                [
                'name'=>'Supervisor',
                'guard_name'=>'web'
                ]
            ];
     
        DB::table('role')->insert($role);
    }
}
