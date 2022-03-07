<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function favorite()
    {
        $user = Auth::user();
        return view('user.favorite', compact('user'));
    }
}
