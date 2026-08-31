<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('coverage_check_logs');
    }

    public function down(): void
    {
        Schema::create('coverage_check_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('area_id')->nullable()->constrained()->nullOnDelete();
            $table->string('service_type');
            $table->string('result');
            $table->string('query_text')->nullable();
            $table->timestamp('created_at')->nullable();

            $table->index(['service_type', 'result']);
            $table->index('created_at');
        });
    }
};
