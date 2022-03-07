<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>コストランキング</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</head>

<body>
    <nav class="bg-yellow-700">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>

                        <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>

                        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="hidden sm:block sm:ml-32">
                        <div class="flex space-x-48">
                            <a href="{{ route('about') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ヤスレピとは</a>

                            <!-- <a href="{{ route('help') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">使いかた</a> -->

                            <a href="{{ route('search') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">検索</a>

                            <a href="{{ url('/login') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ログイン</a>

                            <a href="{{ route('top') }}" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">トップ</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="bg-white">
        <div class="text-center text-3xl mt-10">
            <h2>コスパレシピランキング（TOP5)</h2>
        </div>
        <div class="mt-6 w-1/4 mx-auto">
            <!-- <div class="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8"> -->
            <div class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                @foreach ($recipes as $recipe)
                <div class="text-green-700 font-extrabold text-4xl mt-6">
                    @if ($loop->index === 5)
                    @php die();@endphp
                    @endif
                    {{ $loop->iteration . "位" . " 　" .$recipe->user->name ."さん" }}
                </div>
                <div class="rounded shadow overflow-hidden">
                    <div class="hover:bg-gray-100 duration-300 cursor-pointer">
                        <a href="{{ route('show', ['id'=>$recipe->id]) }}" class="group">
                            <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 mt-6">
                                <img src="{{ asset('/storage/image/' . $recipe->image) }}" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="w-full h-full object-center object-cover group-hover:opacity-75">
                                <h3 class="mt-4 text text-gray-700">
                                    {{ $recipe->title }}
                                </h3>
                                <p class="mt-1 text-lg font-medium text-gray-900">
                                    {{ $recipe->cost}}円
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
    </div>
</body>

</html>