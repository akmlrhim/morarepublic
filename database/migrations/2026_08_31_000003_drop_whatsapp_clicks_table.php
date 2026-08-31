<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('whatsapp_clicks');
    }

    public function down(): void
    {
        Schema::create('whatsapp_clicks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('area_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('product_id')->nullable()->constrained('services')->nullOnDelete();
            $table->string('page_path')->nullable();
            $table->string('search_term')->nullable();
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();
            $table->timestamp('created_at')->nullable();

            $table->index('created_at');
            $table->index('search_term');
        });
    }
};
