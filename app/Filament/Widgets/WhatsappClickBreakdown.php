<?php

namespace App\Filament\Widgets;

use App\Models\WhatsappClick;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class WhatsappClickBreakdown extends StatsOverviewWidget
{
    protected ?string $heading = 'Ringkasan 30 Hari Terakhir';

    protected function getStats(): array
    {
        $since = now()->subDays(30);

        $total = WhatsappClick::query()->where('created_at', '>=', $since)->count();

        $topArea = WhatsappClick::query()
            ->where('created_at', '>=', $since)
            ->whereNotNull('area_id')
            ->selectRaw('area_id, count(*) as aggregate')
            ->groupBy('area_id')
            ->orderByDesc('aggregate')
            ->with('area')
            ->first();

        $topProduct = WhatsappClick::query()
            ->where('created_at', '>=', $since)
            ->whereNotNull('product_id')
            ->selectRaw('product_id, count(*) as aggregate')
            ->groupBy('product_id')
            ->orderByDesc('aggregate')
            ->with('product')
            ->first();

        $topTerm = WhatsappClick::query()
            ->where('created_at', '>=', $since)
            ->whereNotNull('search_term')
            ->selectRaw('search_term, count(*) as aggregate')
            ->groupBy('search_term')
            ->orderByDesc('aggregate')
            ->first();

        return [
            Stat::make('Total klik WhatsApp', (string) $total)
                ->description('30 hari terakhir'),
            Stat::make('Area teratas', $topArea?->area?->name ?? 'Belum ada data')
                ->description($topArea ? $topArea->aggregate.' klik' : 'Belum ada klik dengan area'),
            Stat::make('Produk teratas', $topProduct?->product?->name ?? 'Belum ada data')
                ->description($topProduct ? $topProduct->aggregate.' klik' : 'Belum ada klik dengan produk'),
            Stat::make('Search term teratas', $topTerm?->search_term ?? 'Belum ada data')
                ->description($topTerm ? $topTerm->aggregate.' klik' : 'Belum ada search term tercatat'),
        ];
    }
}
