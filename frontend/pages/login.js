import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { DefaultLayout } from '../components/templates/layouts/DefaultLayout';
// import { LoginForm } from '../components/organisms/LoginForm';

const BACKEND_URL = 'http://127.0.0.1:8000';

const Login = () => {
  const [email, setEmail] = useState('');
  // console.log('setEmail', setEmail);
  const [password, setPassword] = useState('');

  // const init = async () => {
  //   const res = await fetch('http://127.0.0.1:8000/api/me');
  //   console.log('res', res);
  //   const json = await res.json();
  //   // console.log('json', json);
  //   // console.log('json.recipes', json.recipes);
  //   const recipes = json.recipes.data;
  //   // console.log('recipes', recipes);
  //   setRecipes(recipes);
  // };

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
    console.log('res', res);
    // ログイン出来た場合は、ステータスコード200が返ってくる
    // if (res.status === 200) {
    //   return router.push('/logged');
    // }

    // json型に変更
    const json = await res.json();
    console.log('json', json);
    const userRes = await fetchUser(json.access_token);
    // アクセストークンはjson.accessTokenになる
    // console.log('json.access_token', json.access_token);
    console.log('userRes', userRes);
  };

  // この処理はリソース共有のwebセキュリティ強化のため(cors対策)
  const fetchUserLogin = async (email, password) => {
    // console.log('hoge');
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      mode: 'cors',
      // 1,credentials: 'include',
      // jwt認証は下記のincludeが原因でうまくいかず
      // 結論はlaravel側に送っている情報のタイプが異なっていた！
      // 本当はContent-Typeをapplication/jsonで送りたかった！
      // modeをno-corsにしたことで、Content-Typeはtext/plainになってしまった
      // つまり、laravel側ではEmailをjson型ではなく、ただの文字列としてしか受け取れなかった！

      // 2,APIやcorsのデバッグの時はdieを使わない
      // 受け取れなくて401でた原因はデバッグdie;をreturnの前につけたことで正しくresponse header送れていない、それがcorsのエラー扱いになってしまった
      // returnの後にcors対策許可用がだせなくて
      headers: {
        'Content-Type': 'application/json; charset=utf8',
        'Accept': 'application/json',
      },
      // ある JavaScript のオブジェクトや値を JSON 文字列に変換します
      body: JSON.stringify({ email, password }),
    });
    return res;
  };

  // useEffect(() => {
  //   init();
  // }, []);

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
