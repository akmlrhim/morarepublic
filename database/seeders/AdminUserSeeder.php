<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
  public function run(): void
  {
    User::query()->updateOrCreate(
      ['email' => 'adm.impostmedia@gmail.com'],
      [
        'name' => 'Administrator',
        'password' => Hash::make('myrep_im26'),
        'is_admin' => true,
        'email_verified_at' => now(),
      ],
    );
  }
}
