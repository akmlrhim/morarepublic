<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->index(['status', 'is_hero', 'order'], 'services_status_is_hero_order_index');
        });

        Schema::table('packages', function (Blueprint $table) {
            $table->index(['service_id', 'order'], 'packages_service_id_order_index');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropIndex('services_status_is_hero_order_index');
        });

        Schema::table('packages', function (Blueprint $table) {
            $table->dropIndex('packages_service_id_order_index');
        });
    }
};
