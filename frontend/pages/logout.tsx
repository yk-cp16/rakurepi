import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { DefaultLayout } from '../components/templates/layouts/DefaultLayout';
import { fetchUserLogin } from '/apis/users';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onClickLogin = async () => {
    const res = await fetchUserLogin(email, password);
    if (!res) {
      alert('ログイン情報が間違っています');
      return;
    }
    router.push('/recipe');
  };

  return (
    <DefaultLayout>
      <main>
        <h1 className={styles.title}>
          ログアウト
        </h1>

        <div className="w-full max-w-xs mx-auto" >
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                メールアドレス
              </label>
              <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onClickLogin}>
                ログイン
              </button>
            </div>
          </form>
        </div>
      </main >
    </DefaultLayout >
  );
}

export default Login;
