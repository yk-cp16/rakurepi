@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">投稿編集</div>
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
                    <form action="{{ route('user.update', ['id' =>$recipe->id]) }}" method="POST" enctype="multipart/form-data">
                        {{ csrf_field() }}
                        <div class="form-group row">
                            <label for="role" class="col-md-4 col-form-label text-md-right">{{ __('Image') }}</label>
                            <div class="col-md-6">
                                <input id="image" type="file" class="form-control-file" name="image">
                                <div class="form-text text-info">
                                    設定中:{{ $recipe->image }}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="role" class="col-md-4 col-form-label text-md-right">{{ __('金額') }}</label>
                            <div class="col-md-6">
                                <input id="cost" type="text" class="form-control" name="cost" value="{{ $recipe->cost }}">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="title" class="col-md-4 col-form-label text-md-right">{{ __('タイトル') }}</label>
                            <div class="col-md-6">
                                <input id="title" type="text" class="form-control" name="title" value="{{ $recipe->title }}">
                            </div>
                        </div>

                        @if ($recipe->recipe_ingredients->isEmpty())
                        @foreach (range(0, 3) as $index => $value)

                        <div class="form-group row">
                            <label for="ingredient_name" class="col-md-4 col-form-label text-md-right">{{ __('材料') }}</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" name="ingredients[{{ $index }}][name]" value="">
                            </div>
                            <label for="ingredient_amount" class="col-md-1 col-form-label text-md-right">{{ __('数量') }}</label>
                            <div class="col-md-2">
                                <input type="text" class="form-control" name="ingredients[{{ $index }}][amount]" value="">
                            </div>
                        </div>
                        @endforeach

                        @else
                        @foreach ($recipe->recipe_ingredients as $index => $recipe_ingredient)
                        <div class="form-group row">
                            <label for="ingredient_name" class="col-md-4 col-form-label text-md-right">{{ __('材料1') }}</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" name="ingredients[{{ $index }}][name]" value="{{ $recipe_ingredient->name }}">
                            </div>
                            <label for="ingredient_amount" class="col-md-1 col-form-label text-md-right">{{ __('数量') }}</label>
                            <div class="col-md-2">
                                <input type="text" class="form-control" name="ingredients[{{ $index }}][amount]" value="{{ $recipe_ingredient->amount }}">
                            </div>
                        </div>
                        @endforeach
                        @endif

                        <div class="form-group row">
                            <label for="description" class="col-md-4 col-form-label text-md-right">{{ __('作り方') }}</label>
                            <div class="col-md-6">
                                <textarea id="description" name="description" rows="5" class="form-control" style="resize: none;">{{ $recipe->description }}</textarea>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary" name='action' value='edit'>
                                    {{ __('更新する') }}
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