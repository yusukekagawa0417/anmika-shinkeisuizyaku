'use strict';

// URLパラメータ取得
const searchParams = new URLSearchParams(window.location.search);
const pt = searchParams.get('pt');
const maisu = searchParams.get('len');
let resultDescription = "";
if (pt === 'cdghgg') {
  resultDescription = "ええやーん！<br>やるやん自分！<br>ハッピー、ラッキー、<br>ラブ、スマイル、<br>ピース、ドリーム！<br>今日も1日元気出して行こか！";
}
if (pt === '47hm3y') {
  resultDescription = "すごい！すごい！<br>ほんまにすごい！<br>すごい通り越して変やで、自分！";
}
if (pt === 'dfkujp') {
  resultDescription = "ゲームクリア<br>おめでとうございます。<br>とてつもない偉業を<br>達成したあなたに<br>敬意と皮肉を込めて<br>次の言葉を送ります。<br><br>私が一番好きなものは<br>お金がかからないもので、<br>誰もが持っているものだ。<br>そして、それは世の中で<br>一番素晴らしいものなんだ。<br>それは、「時間」なんだよ。<br><br>Steve Jobs<br>スティーブ・ジョブズ";
}
if (pt === 'jyr7hf') {
  resultDescription = "もうやめてしまうん？<br>また勉強しに来てな！";
}
if (pt === 'zp9eru') {
  resultDescription = "やった後悔より、<br>やらなかった後悔のほうが<br>深く残るもんやで！<br>もう一回頑張ってみいひん？";
}
if (pt === 'y7m2xt') {
  resultDescription = "人生で失敗した事ない人なんて<br>おらへんねん。全然大丈夫。<br>もう一回チャレンジチャレンジ！";
}
if (pt === '7wu2eg') {
  resultDescription = "諦めんなよ！<br>諦めんなよ、お前！！<br>どうしてそこでやめるんだ、<br>そこで！！<br>もう少し頑張ってみろよ！<br>ダメダメダメ！<br>諦めたら！<br>周りのこと思えよ、<br>応援してる人たちのこと<br>思ってみろって！<br>あともうちょっとの<br>ところなんだから！";
}
const result = document.getElementById('result');
// let p1 = result.appendChild(document.createElement("p"));
// p1.setAttribute('class', 'result-maisu');
// p1.innerHTML = `<span>${maisu}</span> 枚`;
let p2 = result.appendChild(document.createElement("p"));
p2.setAttribute('class', 'result-description');
p2.innerHTML = resultDescription;