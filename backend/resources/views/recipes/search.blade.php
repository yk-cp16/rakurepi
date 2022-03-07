@extends('layouts.recipeapp')

@section('title','ヤスレピとは？')

@section('header')
<a href="" class="text-white hover:bg-gray-700 hover:text-white py-2 rounded-md text-sm font-medium"></a>
<a href="{{ route('about') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ヤスレピとは</a>

<!-- <a href="{{ route('help') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">使いかた</a> -->

<a href="{{ route('ranking') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ランキング</a>

<a href="{{ url('/login') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ログイン</a>
<a href="{{ route('top') }}" class="text-white hover:bg-gray-700 hover:text-white px-6 py-2 rounded-md text-sm font-medium">トップ</a>
@endsection


@section('headerImage')
@endsection
@section('content')
<div class="bg-white">
    <div class="text-center text-3xl mt-6">
        <h1>レシピ検索</h1>
    </div>
    <form action="{{ route('search') }}" method="get" class="mx-auto md:max-w-md">
        {{ csrf_field()}}
        {{method_field('get')}}
        <div class="flex justify-center mt-6">
            <input id="title" name="title" type="text" class="appearance-none rounded-none relative block w-11/12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-s" placeholder="料理名を入力してください">
        </div>
        <div class="flex justify-center mt-6">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {{ __('検索') }}
            </button>
        </div>
    </form>
    <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 mt-6">
        @foreach ($recipes as $recipe)
        <div class="rounded shadow overflow-hidden">
            <div class="hover:bg-gray-100 duration-300 cursor-pointer">
                <a href="{{ route('show', ['id'=>$recipe->id]) }}" class="group">
                    <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img src="{{ asset('/storage/image/' . $recipe->image) }}" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="w-full h-full object-center object-cover group-hover:opacity-75">
                        <h3 class="mt-4 text text-gray-700">
                            {{ $recipe->title }}
                        </h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">
                            {{ $recipe->cost}}円
                            ({{ $recipe->user->name }}さん)
                        </p>
                        <p class="mt-1 text-lg font-medium text-gray-900">
                            @if (Auth::check())
                        <form action="{{ route('user.favorite.store') }}" method="POST" class="mb-4">
                            @csrf
                            <input type="hidden" name="recipe_id" value="{{$recipe->id}}">
                            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                お気に入り
                            </button>
                        </form>
                        @endif
                        </p>
                    </div>
                </a>
            </div>
        </div>
        @endforeach
    </div>
</div>
@endsection