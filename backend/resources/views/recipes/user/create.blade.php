@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">レシピ投稿</div>
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

                    <form action="{{ route('user.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group row">
                            <label for="role" class="col-md-4 col-form-label text-md-right">{{ __('料理画像') }}</label>
                            <div class="col-md-6">
                                <input id="image" type="file" class="form-control-file" name="image" value="{{ old('image') }}">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="role" class="col-md-4 col-form-label text-md-right">{{ __('金額') }}</label>
                            <div class="col-md-6">
                                <input id="cost" type="text" class="form-control" name="cost" value="{{ old('cost') }}" placeholder="数字のみ記載">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="title" class="col-md-4 col-form-label text-md-right">{{ __('タイトル') }}</label>
                            <div class="col-md-6">
                                <input id="title" type="text" class="form-control" name="title" value="{{ old('title') }}">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="ingredient_name" class="col-md-4 col-form-label text-md-right">{{ __('材料') }}</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" name="ingredients[0][name]" value="{{ old('ingredient_name') }}" placeholder="例)パスタ">
                            </div>
                            <label for="ingredient_amount" class="col-md-1 col-form-label text-md-right">{{ __('数量') }}</label>
                            <div class="col-md-2">
                                <input type="text" class="form-control" name="ingredients[0][amount]" value="{{ old('ingredient_amount') }}" placeholder="例) 100g">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="ingredient_name" class="col-md-4 col-form-label text-md-right">{{ __('材料') }}</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" name="ingredients[1][name]" value="{{ old('ingredient_name') }}" placeholder="例)生卵">
                            </div>
                            <label for="ingredient_amount" class="col-md-1 col-form-label text-md-right">{{ __('数量') }}</label>
                            <div class="col-md-2">
                                <input type="text" class="form-control" name="ingredients[1][amount]" value="{{ old('ingredient_amount') }}" placeholder="例) 1個">
                            </div>
                        </div>
                        <div class="flex form-group row">
                            <label for="ingredient_name" class="col-md-4 col-form-label text-md-right">{{ __('材料') }}</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" name="ingredients[2][name]" value="{{ old('ingredient_name') }}" placeholder="例)にんにく">
                            </div>
                            <label for="ingredient_amount" class="col-md-1 col-form-label text-md-right">{{ __('数量') }}</label>
                            <div class="col-md-2">
                                <input type="text" class="form-control" name="ingredients[2][amount]" value="{{ old('ingredient_amount') }}" placeholder="例) 1/2個">
                            </div>
                        </div>
                        <div class="flex form-group row">
                            <label for="ingredient_name" class="col-md-4 col-form-label text-md-right">{{ __('材料') }}</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" name="ingredients[3][name]" value="{{ old('ingredient_name') }}" placeholder="例)塩胡椒">
                            </div>
                            <label for="ingredient_amount" class="col-md-1 col-form-label text-md-right">{{ __('数量') }}</label>
                            <div class="col-md-2">
                                <input type="text" class="form-control" name="ingredients[3][amount]" value="{{ old('ingredient_amount') }}" placeholder="例) 大さじ1">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="description" class="col-md-4 col-form-label text-md-right">{{ __('作り方') }}</label>
                            <div class="col-md-6">
                                <!-- <input id="description" type="text" class="form-control" name="description" value="{{ old('description') }}"> -->
                                <textarea id="textarea" name="description" rows="5" class="form-control" style="resize: none;">

例                                
①温かいご飯用意する
②生卵をご飯に乗せて混ぜる
③醤油を加えて混ぜる
                            </textarea>
                            </div>
                        </div>
                        {{ csrf_field() }}

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary" name='action' value='add'>
                                    {{ __('作成する') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection