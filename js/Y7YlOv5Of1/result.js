'use strict';

// URLパラメータ取得
const searchParams = new URLSearchParams(window.location.search);
const pt = searchParams.get('pt');
const maisu = searchParams.get('len');
const mode = searchParams.get('mode');
const btn_audio_clear_1 = document.getElementById('btn_audio_clear_1');
let resultDescription = "";
let resultDescription2 = "";
if (pt === 'cdghgg') {
  resultDescription = "ええやーん！<br>やるやん自分！<br>ハッピー、ラッキー、<br>ラブ、スマイル、<br>ピース、ドリーム！<br>今日も1日元気出して行こか！";
  btn_audio_clear_1.play();
  resultDescription2 = '見事、Easyモードをクリアしました！';
}
if (pt === '47hm3y') {
  resultDescription = "すごい！すごい！<br>ほんまにすごい！<br>すごい通り越して変やで、自分！";
  btn_audio_clear_1.play();
  resultDescription2 = '見事、Hardモードをクリアしました！';
}
if (pt === 'dfkujp') {
  resultDescription = "ゲームクリア<br>おめでとうございます。<br>とてつもない偉業を<br>達成したあなたに<br>敬意と皮肉を込めて<br>次の言葉を送ります。<br><br>私が一番好きなものは<br>お金がかからないもので、<br>誰もが持っているものだ。<br>そして、それは世の中で<br>一番素晴らしいものなんだ。<br>それは、「時間」なんだよ。<br><br>Steve Jobs<br>スティーブ・ジョブズ";
  btn_audio_clear_1.play();
  resultDescription2 = '見事、VeryHardモードをクリアしました！';
}
if (pt === 'jyr7hf') {
  resultDescription = "もうやめてしまうん？<br>また勉強しに来てな！";
  resultDescription2 = '【' + mode + 'モード】残念！あなたの記録は' + maisu + '枚です。';
}
if (pt === 'zp9eru') {
  resultDescription = "やった後悔より、<br>やらなかった後悔のほうが<br>深く残るもんやで！<br>もう一回頑張ってみいひん？";
  resultDescription2 = '【' + mode + 'モード】残念！あなたの記録は' + maisu + '枚です。';
}
if (pt === 'y7m2xt') {
  resultDescription = "人生で失敗した事ない人なんて<br>おらへんねん。全然大丈夫。<br>もう一回チャレンジチャレンジ！";
  resultDescription2 = '【' + mode + 'モード】残念！あなたの記録は' + maisu + '枚です。';
}
if (pt === '7wu2eg') {
  resultDescription = "諦めんなよ！<br>諦めんなよ、お前！！<br>どうしてそこでやめるんだ、<br>そこで！！<br>もう少し頑張ってみろよ！<br>ダメダメダメ！<br>諦めたら！<br>周りのこと思えよ、<br>応援してる人たちのこと<br>思ってみろって！<br>あともうちょっとの<br>ところなんだから！";
  resultDescription2 = '【' + mode + 'モード】残念！あなたの記録は' + maisu + '枚です。';
}
const result = document.getElementById('result');
// let p1 = result.appendChild(document.createElement("p"));
// p1.setAttribute('class', 'result-maisu');
// p1.innerHTML = `<span>${maisu}</span> 枚`;
let p2 = result.appendChild(document.createElement("p"));
p2.setAttribute('class', 'result-description');
p2.innerHTML = resultDescription;

// シェアボタンのリンク先
let shareUrl  = 'https://twitter.com/share?ref_src=twsrc%5Etfw&hashtags=アンミカ,神経衰弱,白って200色あんねん';

// シェアボタン追加
const shareArea = document.getElementById('twitter');
const shareLink = '<a href="' + shareUrl + '" class="twitter-share-button" data-size="large" data-text="' + resultDescription2 + '" data-url="https://anmika-shinkeisuijaku.netlify.app/">twitter</a>';
shareArea.innerHTML = shareLink;