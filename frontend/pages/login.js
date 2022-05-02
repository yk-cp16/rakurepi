import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { DefaultLayout } from '../components/templates/layouts/DefaultLayout';
// import { LoginForm } from '../components/organisms/LoginForm';

const BACKEND_URL = 'http://127.0.0.1:8000';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // ユーザー情報取得
  const fetchUser = async (accessToken) => {
    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log('fetchUser_res', res);
    return await res.json();
  }

  const loginAuth = async () => {
    console.log('email', email);
    const res = await fetchUserLogin(email, password);
    // ログイン出来た場合は、ステータスコード200が返ってくる
    // if (res.status === 200) {
    //   return router.push('/logged');
    // }

    // json型に変更
    const json = await res.json();
    console.log('json', json);
    const userRes = await fetchUser(json.access_token);
    // アクセストークンはjson.accessTokenになる
    console.log('userRes', userRes);
  };

  return (
    <DefaultLayout>
      <main className={styles.main} >
        <h1 className={styles.title}>
          会員ログインフォーム
        </h1>

        <div className={styles.container} >
          <form>
            <ul>
              <li>
                <span className="inputTitle">メールアドレス</span>
                <input type="email" name="email" className="email" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
              </li>
              <li>
                <span className="inputTitle">パスワード</span>
                <input
                  type="password"
                  name="password"
                  className="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </li>
            </ul>
            <button type='button' onClick={loginAuth}>ログイン</button>
          </form>
        </div>
      </main>
    </DefaultLayout>
  );
}

export default Login;
