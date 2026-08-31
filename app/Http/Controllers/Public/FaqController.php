<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Faq/Index', [
            'seo' => Seo::forPage(
                'Pertanyaan yang Sering Ditanyakan (FAQ)',
                'Jawaban lengkap seputar harga, tagihan, modem, coverage, hingga perbandingan FWA dan FTTH.',
                '/faq',
            ),
        ]);
    }
}
