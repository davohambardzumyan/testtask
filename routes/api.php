<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix("tasks")->group(function (){
   Route::get("/list",[TaskController::class,"index"]);
   Route::post("/store",[TaskController::class,"store"]);
   Route::delete("/{id}/delete",[TaskController::class,"destroy"]);
});
