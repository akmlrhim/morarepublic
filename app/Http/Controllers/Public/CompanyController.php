<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('AboutUs', [
            'seo' => Seo::forPage(
                'Tentang Mora Republic',
                'Visi, misi, dan komitmen Mora Republic dalam membangun infrastruktur dan layanan digital yang menjangkau seluruh negeri.',
                '/tentang-kami',
            ),
        ]);
    }
}
