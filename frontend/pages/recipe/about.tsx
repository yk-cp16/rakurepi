import styles from '../../styles/Home.module.css'
import { DefaultLayout } from '../../components/templates/layouts/DefaultLayout';

const About = () => {
  return (
    <DefaultLayout>
      <div className="text-center text-5xl mt-6 mb-3 font-semibold tracking-wide">
        <h1>ラクレピとは？</h1>
      </div>
      <div className="flex justify-center text-3xl">
        <div className="text-left">
          <div className="text-2xl mt-12">
            <div className="ml-8">
              <li>簡単、安く作れるレシピサイトです。</li>
              <li>1人暮らしの方、料理が苦手な方、節約したい方向けです。</li>
              <ul>　 普段料理しない人でも短時間で調理工程が少なく、</ul>
              <li>ぱっと見て作れるレシピサイトを作りたいと思いました。</li>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout >
  );
}
export default About;
