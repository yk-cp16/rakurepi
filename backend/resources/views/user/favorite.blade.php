@extends('layouts.app')

@section('content')
<div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Products</h2>
        <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            @foreach ($user->favorite_recipes as $favoriteRecipe)
            <div class="rounded shadow overflow-hidden">
                <div class="hover:bg-gray-100 duration-300 cursor-pointer">
                    <a href="{{ route('show', ['id'=>$favoriteRecipe->id]) }}" class="group">
                        <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                            <img src="{{ asset('/storage/image/' . $favoriteRecipe->image) }}" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="w-full h-full object-center object-cover group-hover:opacity-75">
                        </div>
                        <h3 class="mt-4 text text-gray-700">
                            {{ $favoriteRecipe->title }}
                        </h3>
                        <p class="mt-1 text-lg font-medium text-gray-900">
                            {{ $favoriteRecipe->cost}}円
                        </p>
                    </a>
                </div>
            </div>
            @endforeach
        </div>
        <div class="flex justify-center mt-6 page-links">
        </div>
    </div>
</div>
@endsection