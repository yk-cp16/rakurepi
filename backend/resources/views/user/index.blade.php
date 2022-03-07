@extends('layouts.app')
@section('header')
<li class="nav-item hidden flex sm:block sm:ml-72">
    <a class="nav-link" href="">{{ __('') }}</a>
</li>
<li class="nav-item hidden flex sm:block sm:ml-72">
    <a class="nav-link" href="{{ url('/user/create') }}">{{ __('投稿する') }}</a>
</li>
<li class="nav-item hidden flex sm:block sm:ml-12">
    <a class="nav-link" href="{{ url('/user/menu') }}">{{ __('献立') }}</a>
</li>
<li class="nav-item hidden flex sm:block sm:ml-12">
    <a class="nav-link" href="{{ url('/user/favorite') }}">{{ __('お気に入り') }}</a>
</li>
@endsection
@section('content')
<div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{__('')}}
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{__('タイトル')}}
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{__('材料')}}
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{__('作り方')}}
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{__('金額')}}
                            </th>
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @foreach ($recipes as $recipe)
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="{{ asset('/storage/image/' . $recipe->image) }}" alt="" width="80px" height="80px">
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 py-4 whitespace-normal">
                                {{ $recipe->title }}
                            </td>
                            <td class="px-4 py-4 w-25 whitespace-normal">
                                @foreach ($recipe->recipe_ingredients as $recipe_ingredient)
                                <p>{{ $recipe_ingredient->name }}　
                                    {{ $recipe_ingredient->amount }}
                                </p>
                                @endforeach
                            </td>
                            <td class="px-1 py-4 whitespace-normal">
                                {!! nl2br(e($recipe->description)) !!}
                            </td>
                            <td class="px-6 py-4 whitespace-normal">
                                {{ $recipe->cost}}
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                                    <a href="{{ route('user.edit') }}?id={{ $recipe->id }}">{{ __('編集') }}</a>
                                </button>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <form method="POST" action="{{route('user.delete',['id'=>$recipe->id])}}">
                                    @csrf
                                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded">削除</button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex justify-center mt-6 page-links">
            {{ $recipes->links() }}
        </div>
    </div>
</div>
@endsection