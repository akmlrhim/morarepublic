<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->unsignedInteger('speed_mbps')->nullable()->after('name');
            $table->json('features')->nullable()->after('price_label');
            $table->boolean('is_featured')->default(false)->after('features');
        });
    }

    public function down(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->dropColumn(['speed_mbps', 'features', 'is_featured']);
        });
    }
};
