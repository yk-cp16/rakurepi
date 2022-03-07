@extends('layouts.recipeapp')

@section('title','使い方')

@section('header')
<a href="{{ route('about') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ヤスレピとは</a>

<a href="{{ route('search') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">検索</a>

<a href="{{ route('ranking') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ランキング</a>

<a href="{{ url('/login') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ログイン</a>

<a href="{{ route('top') }}" class="text-white hover:bg-gray-700 hover:text-white px-6 py-2 rounded-md text-sm font-medium">トップ</a>
@endsection


@section('headerImage')
<br>
<div class="flex justify-center text-3xl">
    <h2>使用方法について</h2>
    <div class="text-2xl">
        <p>機能一覧</p>

        <!-- <ul> -->
        <li>閲覧したい料理をクリックするとレシピ詳細ページに遷移します</li>
        <li>レシピ詳細ページ</li>
        <li>タイトル検索機能</li>
        <li>コストパフォーマンス別ランキング</li>
        <li>ログイン認証機能</li>
        <li>投稿機能（新規会員登録する必要あり)</li>
        <!-- </ul> -->
    </div>
</div>
@endsection