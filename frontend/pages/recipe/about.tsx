import styles from '../../styles/Home.module.css'
import { DefaultLayout } from '../../components/templates/layouts/DefaultLayout';


const About = () => {
  return (
    <DefaultLayout>
      <main className={styles.main}>
        <h1 className="text-center text-5xl mb-3 font-semibold tracking-wide">
          ヤスレピとは？
        </h1>
        <div className="text-2xl mt-6">
          <p>安く作れるレシピサイトです</p>
          <p>1人暮らしの方、料理が苦手な方、節約したい方におすすめです！</p>

          <p>料理は気分転換にもなりますし、自炊して節約しています！</p>
          <p>ただレシピサイトを見た時に作るのが難しそうであったり</p>
          <p>必要な費用が記載なかったりなのでぱっとみてわかるレシピサイトを作りました！</p>
        </div>

        <div className="flex justify-center text-3xl">
          <div className="text-2xl mt-12">
            <ul className="text-3xl">
              <li>【機能一覧】</li>
            </ul>
            <li>レシピ一覧表示・詳細ページ</li>
            {/* <li>ページネーション</li> */}
            <li>タイトル検索機能</li>
            <li>コストパフォーマンス別ランキング表示</li>
            <li>ログイン認証機能</li>
            <li>投稿機能（新規会員登録必要)</li>
            <li>お気に入り追加、解除（新規会員登録必要)</li>
          </div>
        </div>
      </main >
    </DefaultLayout >
  );
}
export default About;
