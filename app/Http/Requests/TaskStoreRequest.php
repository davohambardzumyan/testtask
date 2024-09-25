<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskStoreRequest extends FormRequest
{
    protected $stopOnFirstFailure=true;

    public function rules(): array
    {
        return [
            "title"=>"required|string|min:3|max:225",
            "description"=>"nullable|string|min:3",
        ];
    }
}
