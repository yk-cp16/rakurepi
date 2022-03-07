@extends('layouts.recipeapp')

@section('title','レシピサイト')

@section('header')
<a href="" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"></a>

<a href="{{ route('search') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">検索</a>

<a href="{{ route('ranking') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ランキング</a>

<a href="{{ url('/login') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ログイン</a>

<a href="{{ route('top') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">トップ</a>
@endsection

@section('headerImage')
<div class="text-center text-3xl mt-3 mb-2">
    <h2>{{ $recipe->title }}</h2>
</div>
<div class="text-right text-2xl mr-72 mb-3">
    <h3>金額{{ $recipe->cost }}円　作成者{{ $recipe->user->name }}さん　　　　　　</h3>
</div>
<div class="flex justify-center">
    <div class="w-104 h-96 border border-gray-200 rounded-md overflow-hidden">
        <img alt="" src="../storage/food-top.jpg" class="w-full h-full object-center object-cover">
    </div>
</div>
<div class="mt-8">
    <div class="w-1/2 mx-auto">
        <div class="text-left text-2xl">
            <div class="w-full py-2 border-b border-black focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50">
                <h2>材料（1人分）</h2>
            </div>
            <div class="mt-3">
                @foreach ($recipe->recipe_ingredients as $recipe_ingredient)
                <!-- <div class="w-1/2 mx-auto"> -->
                <div class="flex w-full py-2 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50 justify-between">
                    <p>{{ $recipe_ingredient->name }}</p>
                    <p>{{ $recipe_ingredient->amount }}</p>
                </div>

                @endforeach
            </div>
            <div class="mt-9">
                <div class="w-full py-2 border-b border-black focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50">
                    <h2>作り方</h2>
                </div>
                <div class="mt-8">
                    <div class="mx-auto">
                        {!! nl2br(e($recipe->description)) !!}
                    </div>
                </div>
            </div>
        </div>

        @endsection