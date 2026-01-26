<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
//logout eleminer la session precedente et regener token pour etre more safe

public function logout(Request $request)
{
    Auth::logout(); 

    $request->session()->invalidate(); 

    $request->session()->regenerateToken(); 

    return redirect()->route('login')->with('success', 'Logged out successfully');
}
}
