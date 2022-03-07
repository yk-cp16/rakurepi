@extends('layouts.recipeapp')

@section('title','ヤスレピとは？')

@section('header')
<!-- <a href="{{ route('help') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">使いかた</a> -->
<a href="" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"></a>

<a href="{{ route('search') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">検索</a>

<a href="{{ route('ranking') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ランキング</a>

<a href="{{ url('/login') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ログイン</a>

<a href="{{ route('top') }}" class="text-white hover:bg-gray-700 hover:text-white px-6 py-2 rounded-md text-sm font-medium">トップ</a>
@endsection


@section('headerImage')
<br>
<div class="text-center text-3xl font-semibold">
    <h1>ヤスレピとは？</h1>
    <div class="text-2xl mt-6">
        <p>安く作れるレシピサイトです</p>
        <p>1人暮らしの方、料理が苦手な方、節約したい方におすすめです！</p>
        <br>
        <p>料理は気分転換にもなりますし、自炊して節約しています！</p>
        <p>ただレシピサイトを見た時に作るのが難しそうであったり</p>
        <p>必要な費用が記載なかったりなのでぱっとみてわかるレシピサイトを作りました！</p>
    </div>
</div>
<div class="flex justify-center text-3xl">
    <div class="text-2xl mt-12">
        <ul class="text-3xl">
            <li>【機能一覧】</li>
        </ul>
        <li>レシピ一覧表示・詳細ページ</li>
        <li>ページネーション</li>
        <li>タイトル検索機能</li>
        <li>コストパフォーマンス別ランキング表示</li>
        <li>ログイン認証機能</li>
        <li>投稿機能（新規会員登録必要)</li>
        <li>お気に入り追加（新規会員登録必要)</li>
        <!-- </ul> -->
    </div>
</div>
@endsection