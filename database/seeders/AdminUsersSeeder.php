<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'akram@gmail.com'],
            ['name' => 'Admin 1', 'password' => Hash::make('akram2006'), 'role' => 'admin']
        );

        User::updateOrCreate(
            ['email' => 'ayoub@gmail.com'],
            ['name' => 'Admin 2', 'password' => Hash::make('ayoub2006'), 'role' => 'admin']
        );

        User::updateOrCreate(
            ['email' => 'ayman@gmail.com'],
            ['name' => 'Admin 3', 'password' => Hash::make('ayman2005'), 'role' => 'admin']
        );
    }
}

