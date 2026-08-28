<?php

namespace App\Filament\Resources\ContactSubmissions\Pages;

use App\Enums\SubmissionStatus;
use App\Filament\Resources\ContactSubmissions\ContactSubmissionResource;
use App\Models\ContactSubmission;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditContactSubmission extends EditRecord
{
    protected static string $resource = ContactSubmissionResource::class;

    public function mount(int|string $record): void
    {
        parent::mount($record);

        $submission = $this->getRecord();

        if ($submission instanceof ContactSubmission && $submission->status === SubmissionStatus::New) {
            $submission->update(['status' => SubmissionStatus::Read]);
            $this->fillForm();
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResourceUrl('index');
    }
}
