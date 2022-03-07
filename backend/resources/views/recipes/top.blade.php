@extends('layouts.recipeapp')

@section('title','レシピサイト')

@section('header')
<a href="{{ route('about') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ヤスレピとは</a>

<!-- <a href="{{ route('help') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">使いかた</a> -->

<a href="{{ route('search') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">検索</a>

<a href="{{ route('ranking') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ランキング</a>

<a href="{{ route('user.favorite') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">お気に入り</a>

<a href="{{ url('/login') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ログイン</a>
@endsection

@section('headerImage')
<div class="h-screen">
    <img alt="" src="../storage/food-top.jpg" class="w-full h-full object-center object-cover">
</div>
@endsection


@section('content')
<div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Products</h2>
        <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            @foreach ($recipes as $recipe)

            <div class="rounded shadow overflow-hidden">
                <div class="hover:bg-gray-100 duration-300 cursor-pointer">
                    <a href="{{ route('show', ['id'=>$recipe->id]) }}" class="group">
                        <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                            <img src="{{ asset('storage/image/' . $recipe->image) }}" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="w-full h-full object-center object-cover group-hover:opacity-75">

                            <h3 class="mt-4 text text-gray-700">
                                {{ $recipe->title }}
                            </h3>
                            <p class="mt-1 text-lg font-medium text-gray-900">
                                {{ $recipe->cost }}円

                                ({{ $recipe->user->name }}さん)
                            </p>
                            <p class="mt-1 text-lg font-medium text-gray-900">
                                @if (Auth::check())
                            <form action="{{ route('user.favorite.store') }}" method="POST" class="mb-3">
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
        <div class="flex justify-center mt-6 page-links">
            {{ $recipes->links() }}
        </div>
    </div>
</div>
@endsection