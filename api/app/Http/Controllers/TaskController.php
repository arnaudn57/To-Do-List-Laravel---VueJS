<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(){
        return auth()->user()->tasks;
    }

    public function store(Request $request){
        $task = auth()->user()->tasks()->create($request->all());
        return $task;
    }

    public function show($id){
        $task = auth()->user()->tasks()->find($id);
        return $task;
    }

    public function update(Request $request, $id){
        $task = auth()->user()->tasks()->find($id);
        $task->update($request->all());
        return $task;
    }

    public function destroy($id){
        $task = auth()->user()->tasks()->find($id);
        $task->delete();
        return $task;
    }
}
