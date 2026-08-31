<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->decimal('promo_price', 10, 2)->nullable()->after('price');
            $table->unsignedInteger('promo_speed_mbps')->nullable()->after('speed_mbps');
        });
    }

    public function down(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->dropColumn(['promo_price', 'promo_speed_mbps']);
        });
    }
};
