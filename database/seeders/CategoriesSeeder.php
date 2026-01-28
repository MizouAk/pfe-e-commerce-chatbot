<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'PC Gamer',
            'Carte Graphique',
            'Processeur',
            'RAM',
            'SSD',
            'HDD',
            'Carte Mère',
            'Alimentation',
            'Boîtier',
            'Refroidissement',
            'Écran',
            'Clavier',
            'Souris',
        ];

        foreach ($categories as $name) {
            Category::updateOrCreate(
                ['name' => $name],
                ['name' => $name]
            );
        }
    }
}
