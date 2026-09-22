<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class CoverageAreaController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('CoverageArea', [
            'seo' => Seo::forPage(
                'Coverage Area - MyRepublic Air',
                'Jangkauan layanan internet MyRepublic Air di Kalimantan Selatan. Cek area coverage kami untuk mendapatkan akses internet cepat dan stabil.',
                '/coverage-area',
                null,
                'coverage area, myrepublic air, jangkauan internet, kalimantan selatan, internet cepat, internet stabil'
            ),
        ]);
    }
}
