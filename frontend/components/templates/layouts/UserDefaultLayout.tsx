import styles from '../../../styles/Home.module.css';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export const UserDefaultLayout = ({ children }) => {

    return (
        <>
            <Head>
                <title>ヤスレピ</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header} >
                <nav className="bg-yellow-700">
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="w-full sm:ml-30">
                                    <div className="flex justify-between">
                                        <a href="/user/" className="text-white hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-sm font-medium">ラクレピ</a>
                                        <a href="/user/create" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">新規作成</a>
                                        <a href="/user/favorite" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">お気に入り</a>
                                        <a href="/login" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ログアウト</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {/* DefaultLayoutに包まれたものはchildrenに入る */}
            <div className={styles.container} >
                {children}
            </div>

            <footer className={styles.footer} >
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </>
    );
}