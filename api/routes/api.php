<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/me', [App\Http\Controllers\AuthController::class, 'me'])->middleware('auth:sanctum');

//Tasks
Route::get('/tasks', [App\Http\Controllers\TaskController::class, 'index'])->middleware('auth:sanctum');
Route::post('/tasks', [App\Http\Controllers\TaskController::class, 'store'])->middleware('auth:sanctum');
Route::get('/tasks/{task}', [App\Http\Controllers\TaskController::class, 'show'])->middleware('auth:sanctum');
Route::put('/tasks/{task}', [App\Http\Controllers\TaskController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/tasks/{task}', [App\Http\Controllers\TaskController::class, 'destroy'])->middleware('auth:sanctum');
