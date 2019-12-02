<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use Faker\Generator as Faker;




$factory->define(\App\Models\Coresult::class, function (Faker $faker) {

    return [
        'item_id' => $faker->randomElement(['1','2','3']),
        'corrector_id' => $faker->randomElement(['1','2','3','4','5']),
        'mediafilename' => $faker->unique()->numberBetween(1000, 10000),
        'mediafolder' => $faker->name,
        'precorrection'=>"_",
        'results' => "_",
        'state' => "todo"
    ];
});



