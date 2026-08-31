<?php

use App\Models\User;

beforeEach(function () {
    $this->actingAs(User::factory()->create(['is_admin' => true]));
});

it('merender semua halaman panel admin', function (string $url) {
    $this->get($url)->assertOk();
})->with([
    '/admin',
    '/admin/services',
    '/admin/services/create',
    '/admin/articles',
    '/admin/articles/create',
    '/admin/categories',
    '/admin/categories/create',
    '/admin/contact-submissions',
    '/admin/areas',
    '/admin/areas/create',
    '/admin/coverage-areas',
    '/admin/coverage-areas/create',
]);
