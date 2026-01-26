<h1>register</h1>
@if(session('success'))
    <div style="background:#ccffcc; padding:10px;">
        {{ session('success') }}
    </div>
@endif
<form action="{{route('register.send')}}" method="post">
@csrf
<label for="">name</label><br>
<input type="text" name="name" id=""><br>
<label for="">Email</label><br>
<input type="email" name="email" id=""><br>
<label for="">password</label><br>
<input type="password" name="password" id="">
<button type="submit">sent</button>


</form>