<h1>login</h1>
@if(session('error'))
    <p style="color:red;">{{ session('error') }}</p>
@endif

<form action="{{route('login.send')}}" method="post">
@csrf
<label for="">Email</label>
<input type="email" name="email" id="">
<br>
<label for="">password</label>
<input type="password" name="password" id="">
<br>
<button type="submit">login</button>
</form>