<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;



class PageController extends Controller
{
    //cree account avec password hashe et ajouter les donnes a la base de donnes

  public function registerSend(Request $request){
      $data = $request->validate([
          'name'=>'required',
          'email'=>'required|email|unique:users,email',
          'password'=>'required|min:8'
      ]);
      $data['password'] = Hash::make($data['password']);
      User::create($data);
       
      return redirect()->back()->with('success','account was added');
  }


   //pour partir a la page de register
  public function register(){
    return view('/register');
  }

//check email et le password avec celle qu'on a a la base de donnes

  public function loginSend(Request $request)
{
    $data = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if (Auth::attempt($data)) {
        $request->session()->regenerate();
        return redirect()->route('home')->with('success', 'Logged in!');
    }

    return redirect()->back()->with('error', 'Email or password incorrect');
}

//pour partir a la page de login

public function login(){
    return view('/login');
}


}
