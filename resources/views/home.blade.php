@if(session('success'))
    <div style="background:#ccffcc; padding:10px;">
        {{ session('success') }}
    </div>
@endif
<form action="{{route('logout')}}" method="post">
    @csrf
    <button type="submit">logout</button>
</form>