<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(IteminfoTableSeeder::class);
        $this->call(CoresultTableSeeder::class);
       // $this->call(RoleTableSeeder::class);
       // $this->call(PermissionsTableSeeder::class);
    }
}
