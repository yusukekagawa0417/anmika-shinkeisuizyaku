'use strict';
document.addEventListener('DOMContentLoaded',()=>{
  const result = []; // 最終的な二次元配列を入れるための配列
  //CSVファイルを読み込む関数getCSV()の定義
  function getCSV(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "/assets/white_color_list.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function(){
      convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
  }

  // 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
  function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }
  }

  getCSV(); //最初に実行される

  // 効果音取得
  const btn_audio_correct_array = [
    document.getElementById('btn_audio_correct_1'),
    document.getElementById('btn_audio_correct_2'),
    document.getElementById('btn_audio_correct_3'),
    document.getElementById('btn_audio_correct_4')
  ];
  const btn_audio_miss_array = [
    document.getElementById('btn_audio_miss_1'),
    document.getElementById('btn_audio_miss_2'),
    document.getElementById('btn_audio_miss_3'),
    document.getElementById('btn_audio_miss_4')
  ];

  // URLパラメータ取得
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get('mode');
  let typesLen = 4;
  let isDescription = true;
  if (mode === 'easy') {
    typesLen = 4;
    isDescription = true;
  }
  if (mode === 'hard') {
    typesLen = 8;
    isDescription = false;
  }
  if (mode === 'veryhard') {
    typesLen = 122;
    isDescription = false;
  }

  const resultUrl = '/result'

  //Cardクラス作成
  class Card{
    constructor(suit,num){
      //カードのスート(s:スペード、d:ダイヤ...)
      this.suit=suit;
      //カードの数字(1,2,...13)
      this.num=num;
    }
  }
  //カード配列作成
  const cards=[];
  //カードスーツ配列
  const suits=['s', 'd']; // const suits=['s','d','h','c'];
  //2重forで52枚のカードを作成
  for(let i=0;i<suits.length;i++){
    for(let j=1;j<=typesLen;j++){
      //カードインスタンス生成(s1,s2....c13)
      let card=new Card(suits[i],j);
      //配列の末尾に追加
      cards.push(card);
    }
  }
  let firstCard=null;//1枚目のカードを保持(引いてない場合はnull)
  let secondCard=null;//2枚目のカードを保持(引いてない場合はnull)
  //クリックした際の関数を定義
  const flip=(eve)=>{
    //クリックされた要素を特定
    let div=eve.target;
    //表面のカードや3枚目のカードをクリックしても何も起こらない。
    if(!div.classList.contains('back') || secondCard !== null){
      return;
    }
    //表面にする
    div.classList.remove('back');
    //もしそれが1枚目だったらfirstCardに代入
    if(firstCard === null){
      firstCard=div;
    }else{
      //2枚目だったらsecondCardに代入
      secondCard=div;
      //２枚のカードの数字が同じだったら
      if(firstCard.num === secondCard.num){
        //正解だった場合fadeoutクラスを付与する
        firstCard.classList.add('fadeout');
        secondCard.classList.add('fadeout');
        //firstCard,secondカードを共にnullに戻す
        [firstCard,secondCard]=[null,null];
        const num = Math.floor(Math.random() * btn_audio_correct_array.length);
        btn_audio_correct_array[num].play();
        // if文でclass="fadeout"の数を数えてmaxだった場合
        const fadeouts = document.getElementsByClassName('fadeout');
        if (fadeouts.length === typesLen * 2) {
          if (mode === 'easy') {
            window.location.href = resultUrl + '?pt=cdghgg&len=' + fadeouts.length;
            return false;
          }
          if (mode === 'hard') {
            window.location.href = resultUrl + '?pt=47hm3y&len=' + fadeouts.length;
            return false;
          }
          if (mode === 'veryhard') {
            window.location.href = resultUrl + '?pt=dfkujp&len=' + fadeouts.length;
            return false;
          }
        }

      }else{
        //不正回だった場合は1.2秒後に裏面に戻す
        const num = Math.floor(Math.random() * btn_audio_miss_array.length);
        btn_audio_miss_array[num].play();
        setTimeout(()=>{
          firstCard.classList.add('back');
          secondCard.classList.add('back');
          [firstCard,secondCard]=[null,null];
        },1200);
      }
    }
  };
  //cardgridのDOM取得
  const cardgrid=document.getElementById('cardgrid');
  //gridを初期化する処理
  const initgrid=()=>{
    //cardgridに入っている要素をすべて削除
    cardgrid.textContent=null;
      for(let j=0;j<typesLen*2;j++){
        //１枚毎のトランプとなるdiv要素作成
        let div=document.createElement('div');
        //配列からcardを取り出す
        let card=cards[j];
        //色の名称を設定
        let p = div.appendChild(document.createElement("p"))
        if (isDescription) {
          p.textContent = result[card.num][1] //card.suit+':'+card.num;
        }
        //背景色を設定
        div.style.backgroundColor = result[card.num][2];
        // div.dataset.description = result[card.num][3];
        //divにcardクラス追加
        div.classList.add('card');
        //divにcardクラスとbackクラス追加
        div.classList.add('card','back');
        //要素をクリックした際の挙動を登録
        div.onclick=flip;
        //divにnumプロパティを定義して、そこに数字を保存
        div.num=card.num;
        //cardgrid要素に追加
        cardgrid.append(div);
      }
  };
  //カードシャッフル関数(Fisher–Yates shuffle)
  const shuffle=()=>{
    let i=cards.length;
    while(i){
      let index=Math.floor(Math.random()*i--);
      [cards[index],cards[i]]=[cards[i],cards[index]]
    }
  };
  // 諦めるボタンの追加
  const addGiveUpBt = () => {
    const a = document.createElement('a');
    a.setAttribute('id', 'giveup');
    a.classList.add('button');
    a.textContent = '人間、諦めも大事';
    // a.setAttribute('href', resultUrl + '?pt=2');
    a.addEventListener('click',()=>{
      const fadeouts = document.getElementsByClassName('fadeout');
      if (fadeouts.length <= 10) {
        window.location.href = resultUrl + '?pt=jyr7hf&len=' + fadeouts.length;
        return false;
      }
      if (fadeouts.length <= 30) {
        window.location.href = resultUrl + '?pt=zp9eru&len=' + fadeouts.length;
        return false;
      }
      if (fadeouts.length <= 50) {
        window.location.href = resultUrl + '?pt=y7m2xt&len=' + fadeouts.length;
        return false;
      }
      window.location.href = resultUrl + '?pt=7wu2eg&len=' + fadeouts.length;
      return false;
    });
    cardgrid.after(a);
  };
  //ボタンのDOM取得
  const startBt=document.getElementById('startBt');
  //ボタンを押したときの処理
  let started = false;
  startBt.addEventListener('click',()=>{
    if (started) return;
    shuffle();
    initgrid();
    addGiveUpBt();
    started = true;
    document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_audio').play(); //クリックしたら音を再生
    document.getElementById('btn_audio').loop = true;
  });
});
