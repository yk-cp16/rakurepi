@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">My account</div>
                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif
                    {{--成功時のメッセージ--}}
                    @if (session('success'))
                    <div class="alert alert-success">{{ session('success') }}</div>
                    @endif
                    {{-- エラーメッセージ --}}
                    @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                    @endif
                    <div class="text-center">
                        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            <a class="nav-link" href="{{ url('/login') }}">{{ __('メールアドレスの変更') }}</a>
                        </button>
                        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            <a class="nav-link" href="{{ url('password/reset') }}">{{ __('パスワードの変更　') }}</a>
                        </button>
                        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            <a class="nav-link" href="{{ route('login') }}">{{ __('　　退会する　　') }}</a>
                        </button>
                    </div>
                    @endsection