import styles from '../../../styles/Home.module.css';
import Head from 'next/head'
import Link from 'next/link'
import { isAuth } from '/utility/handle-auth';
import { useAuth } from './hooks/useAuth';

export const DefaultLayout = ({ children }) => {
    const { onClickLogout } = useAuth();
    return (
        <>
            <Head>
                <title>ラクレピ</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header} >
                <nav className="bg-yellow-700">
                    <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="w-full sm:ml-30">
                                    <div className="flex justify-between">
                                        <Link href="/recipe/" passHref>
                                            <a
                                                className="text-white hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium">
                                                ラクレピ</a>
                                        </Link>
                                        <Link href="/recipe/about" passHref>
                                            <a className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">about</a>
                                        </Link>
                                        <Link href="/recipe/search" passHref>
                                            <a className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">検索</a>
                                        </Link>
                                        <Link href="/recipe/ranking" passHref>
                                            <a className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ランキング</a>
                                        </Link>
                                        <Link href="/user/favorite" passHref>
                                            <a className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">お気に入り</a>
                                        </Link>
                                        {isAuth() && (
                                            <Link href="/user/" passHref>
                                                <a className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">マイページ</a>
                                            </Link>
                                        )}
                                        <Link href="/login" passHref>
                                            {isAuth() ? (
                                                <a className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                    onClick={onClickLogout}>ログアウト</a>
                                            ) : (<a className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ログイン</a>)}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {children}
            <footer>
            </footer>
        </>
    );
}