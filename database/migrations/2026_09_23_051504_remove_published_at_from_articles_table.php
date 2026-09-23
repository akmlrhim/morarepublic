<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->index('category_id', 'articles_category_id_index');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->dropIndex('articles_category_status_published_index');
            $table->dropIndex('articles_status_published_at_index');
            $table->dropColumn('published_at');
            $table->index('created_at', 'articles_created_at_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropIndex('articles_created_at_index');
            $table->dropIndex('articles_category_id_index');
        });

        Schema::table('articles', function (Blueprint $table) {
            if (! Schema::hasColumn('articles', 'published_at')) {
                $table->timestamp('published_at')->nullable()->after('author_name');
            }
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->index(['status', 'published_at'], 'articles_status_published_at_index');
            $table->index(['category_id', 'status', 'published_at'], 'articles_category_status_published_index');
        });
    }
};
