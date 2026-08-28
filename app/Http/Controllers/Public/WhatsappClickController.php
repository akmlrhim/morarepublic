<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\WhatsappClick;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Mencatat klik tombol WhatsApp untuk analitik iklan.
 * Yang disimpan hanya konteks halaman, tidak ada data pribadi pengunjung.
 */
class WhatsappClickController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'area_id' => ['nullable', 'integer', 'exists:areas,id'],
            'product_id' => ['nullable', 'integer', 'exists:services,id'],
            'page_path' => ['nullable', 'string', 'max:190'],
            'search_term' => ['nullable', 'string', 'max:190'],
            'utm_source' => ['nullable', 'string', 'max:190'],
            'utm_medium' => ['nullable', 'string', 'max:190'],
            'utm_campaign' => ['nullable', 'string', 'max:190'],
        ]);

        WhatsappClick::create($validated);

        return response()->json(['recorded' => true]);
    }
}
