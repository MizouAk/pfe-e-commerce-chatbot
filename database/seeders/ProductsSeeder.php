<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductsSeeder extends Seeder
{
    public function run(): void
    {
        $cat = Category::pluck('id', 'name'); // "PC Gamer" => 1 ...

        $products = [
            // ===== PC Gamer (3) =====
            [
                'category' => 'PC Gamer',
                'name' => 'PC Gamer Starter RTX 4060',
                'description' => 'Configuration idéale pour jouer en 1080p avec un excellent rapport performance/prix.',
                'price' => 999.99,
                'stock' => 4,
                'image' => 'products/pc_starter_rtx4060.jpg',
            ],
            [
                'category' => 'PC Gamer',
                'name' => 'PC Gamer Budget RX 6600',
                'description' => 'PC accessible pour démarrer le gaming en 1080p avec une bonne fluidité.',
                'price' => 799.99,
                'stock' => 3,
                'image' => 'products/pc_budget_rx6600.jpg',
            ],
            [
                'category' => 'PC Gamer',
                'name' => 'PC Gaming Creator i7 + RTX 4070',
                'description' => 'Pensé pour gaming + création: streaming, montage vidéo et multitâche.',
                'price' => 1799.99,
                'stock' => 2,
                'image' => 'products/pc_creator_i7_rtx4070.jpg',
            ],

            // ===== GPUs (6) =====
            [
                'category' => 'Carte Graphique',
                'name' => 'NVIDIA GeForce RTX 4060 8GB',
                'description' => 'Carte graphique efficace pour le gaming en 1080p, bonne consommation.',
                'price' => 349.99,
                'stock' => 12,
                'image' => 'products/rtx4060.jpg',
            ],
            [
                'category' => 'Carte Graphique',
                'name' => 'NVIDIA GeForce RTX 4070 12GB',
                'description' => 'Très bon choix pour jouer en 1440p avec une excellente fluidité.',
                'price' => 649.99,
                'stock' => 5,
                'image' => 'products/rtx4070.jpg',
            ],
            [
                'category' => 'Carte Graphique',
                'name' => 'NVIDIA GeForce RTX 3060 12GB',
                'description' => 'Une valeur sûre pour 1080p, idéale pour un PC gaming au budget maîtrisé.',
                'price' => 279.99,
                'stock' => 8,
                'image' => 'products/rtx3060.jpg',
            ],
            [
                'category' => 'Carte Graphique',
                'name' => 'AMD Radeon RX 7600 8GB',
                'description' => 'Solution solide pour le gaming 1080p, performante et abordable.',
                'price' => 299.99,
                'stock' => 10,
                'image' => 'products/rx7600.jpg',
            ],
            [
                'category' => 'Carte Graphique',
                'name' => 'AMD Radeon RX 7700 XT 12GB',
                'description' => 'Carte orientée 1440p, excellent compromis en haute qualité.',
                'price' => 449.99,
                'stock' => 6,
                'image' => 'products/rx7700xt.jpg',
            ],
            [
                'category' => 'Carte Graphique',
                'name' => 'AMD Radeon RX 6600 8GB',
                'description' => 'Carte d’entrée/milieu de gamme parfaite pour du 1080p à bon prix.',
                'price' => 219.99,
                'stock' => 9,
                'image' => 'products/rx6600.jpg',
            ],

            // ===== CPUs (4) =====
            [
                'category' => 'Processeur',
                'name' => 'AMD Ryzen 5 5600',
                'description' => 'Processeur polyvalent (6 cœurs/12 threads), excellent pour gaming et usage quotidien.',
                'price' => 149.99,
                'stock' => 20,
                'image' => 'products/ryzen55600.jpg',
            ],
            [
                'category' => 'Processeur',
                'name' => 'Intel Core i5-12400F',
                'description' => 'Très bon rapport performance/prix pour un PC gamer moderne.',
                'price' => 169.99,
                'stock' => 18,
                'image' => 'products/i512400f.jpg',
            ],
            [
                'category' => 'Processeur',
                'name' => 'AMD Ryzen 5 7600',
                'description' => 'Plateforme récente, très bon choix pour un PC gaming durable.',
                'price' => 229.99,
                'stock' => 9,
                'image' => 'products/ryzen57600.jpg',
            ],
            [
                'category' => 'Processeur',
                'name' => 'Intel Core i7-12700F',
                'description' => 'Puissant pour création, streaming et applications exigeantes.',
                'price' => 299.99,
                'stock' => 6,
                'image' => 'products/i712700f.jpg',
            ],

            // ===== RAM (4) =====
            [
                'category' => 'RAM',
                'name' => '16GB DDR4 (2x8GB) 3200MHz',
                'description' => 'Kit mémoire recommandé pour gaming et multitâche léger.',
                'price' => 49.99,
                'stock' => 35,
                'image' => 'products/ram16_ddr4_3200.jpg',
            ],
            [
                'category' => 'RAM',
                'name' => '32GB DDR4 (2x16GB) 3600MHz',
                'description' => 'Idéal pour multitâche, création de contenu et jeux modernes.',
                'price' => 89.99,
                'stock' => 15,
                'image' => 'products/ram32_ddr4_3600.jpg',
            ],
            [
                'category' => 'RAM',
                'name' => '16GB DDR5 (2x8GB) 5200MHz',
                'description' => 'Mémoire DDR5 pour plateformes récentes, bonne stabilité.',
                'price' => 69.99,
                'stock' => 20,
                'image' => 'products/ram16_ddr5_5200.jpg',
            ],
            [
                'category' => 'RAM',
                'name' => '32GB DDR5 (2x16GB) 6000MHz',
                'description' => 'Kit DDR5 performant pour gaming haut de gamme et productivité.',
                'price' => 129.99,
                'stock' => 11,
                'image' => 'products/ram32_ddr5_6000.jpg',
            ],

            // ===== SSD (4) =====
            [
                'category' => 'SSD',
                'name' => 'SSD NVMe 500GB',
                'description' => 'Stockage rapide pour système et jeux principaux, excellent confort.',
                'price' => 49.99,
                'stock' => 25,
                'image' => 'products/ssd_nvme_500.jpg',
            ],
            [
                'category' => 'SSD',
                'name' => 'SSD NVMe 1TB',
                'description' => 'Très bon choix pour installer plusieurs jeux avec des chargements rapides.',
                'price' => 79.99,
                'stock' => 22,
                'image' => 'products/ssd_nvme_1tb.jpg',
            ],
            [
                'category' => 'SSD',
                'name' => 'SSD NVMe 2TB',
                'description' => 'Grande capacité pour bibliothèque de jeux et projets lourds.',
                'price' => 139.99,
                'stock' => 12,
                'image' => 'products/ssd_nvme_2tb.jpg',
            ],
            [
                'category' => 'SSD',
                'name' => 'SSD SATA 1TB',
                'description' => 'Alternative économique, fiable et simple pour augmenter le stockage.',
                'price' => 69.99,
                'stock' => 18,
                'image' => 'products/ssd_sata_1tb.jpg',
            ],

            // ===== HDD (2) =====
            [
                'category' => 'HDD',
                'name' => 'HDD 1TB 7200RPM',
                'description' => 'Stockage économique pour données, sauvegardes et gros fichiers.',
                'price' => 44.99,
                'stock' => 20,
                'image' => 'products/hdd_1tb.jpg',
            ],
            [
                'category' => 'HDD',
                'name' => 'HDD 2TB 7200RPM',
                'description' => 'Grande capacité pour archives, films et stockage secondaire.',
                'price' => 59.99,
                'stock' => 16,
                'image' => 'products/hdd_2tb.jpg',
            ],

            // ===== Carte Mère (2) =====
            [
                'category' => 'Carte Mère',
                'name' => 'B550 Motherboard (AM4)',
                'description' => 'Carte mère AM4 stable, idéale pour Ryzen avec bonne connectique.',
                'price' => 119.99,
                'stock' => 14,
                'image' => 'products/mb_b550.jpg',
            ],
            [
                'category' => 'Carte Mère',
                'name' => 'B760 Motherboard (LGA1700)',
                'description' => 'Plateforme moderne pour Intel, fiable et complète en connectivité.',
                'price' => 139.99,
                'stock' => 10,
                'image' => 'products/mb_b760.jpg',
            ],

            // ===== PSU (2) =====
            [
                'category' => 'Alimentation',
                'name' => '650W 80+ Bronze PSU',
                'description' => 'Bon équilibre pour la majorité des configurations gaming, puissance stable.',
                'price' => 69.99,
                'stock' => 16,
                'image' => 'products/psu_650w.jpg',
            ],
            [
                'category' => 'Alimentation',
                'name' => '750W 80+ Gold PSU',
                'description' => 'Rendement supérieur et meilleure marge pour configurations puissantes.',
                'price' => 99.99,
                'stock' => 9,
                'image' => 'products/psu_750w_gold.jpg',
            ],

            // ===== Boîtier (1) =====
            [
                'category' => 'Boîtier',
                'name' => 'Boîtier ATX Airflow (RGB)',
                'description' => 'Boîtier avec excellent flux d’air, idéal pour garder de bonnes températures.',
                'price' => 69.99,
                'stock' => 10,
                'image' => 'products/case_atx_airflow.jpg',
            ],

            // ===== Refroidissement (1) =====
            [
                'category' => 'Refroidissement',
                'name' => 'Watercooling AIO 240mm',
                'description' => 'Solution AIO pour meilleures températures et esthétique soignée.',
                'price' => 89.99,
                'stock' => 8,
                'image' => 'products/aio_240.jpg',
            ],

            // ===== Écran (1) =====
            [
                'category' => 'Écran',
                'name' => 'Écran 24" 144Hz Full HD',
                'description' => 'Moniteur fluide pour jeux compétitifs, parfait pour FPS et e-sport.',
                'price' => 159.99,
                'stock' => 7,
                'image' => 'products/monitor_24_144.jpg',
            ],
        ];

        foreach ($products as $p) {
            if (!isset($cat[$p['category']])) continue;

            Product::updateOrCreate(
                ['name' => $p['name']],
                [
                    'category_id' => $cat[$p['category']],
                    'description' => $p['description'],
                    'price' => $p['price'],
                    'stock' => $p['stock'],
                    'image' => $p['image'],
                ]
            );
        }
    }
}
