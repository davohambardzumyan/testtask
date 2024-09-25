<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskStoreRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        //dont think there will be many records, therefore all records are returned
        return response()->json([
           "list"=>TaskResource::collection(
               Task::all()
           )
        ]);
    }

    public function store(TaskStoreRequest  $request)
    {
        $task = TaskResource::make(
            Task::create($request->validated())
        );

        return response()->json(compact("task"));
    }

    public function destroy(int $id)
    {
        Task::query()->where("id", $id)->delete();

        return response()->noContent();
    }
}
