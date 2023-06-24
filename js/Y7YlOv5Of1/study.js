'use strict';
document.addEventListener('DOMContentLoaded',()=>{
  const result = []; // 最終的な二次元配列を入れるための配列
  //CSVファイルを読み込み表示させる関数の定義
  function getCSVAndDisplay(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "/assets/white_color_list.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function(){
      convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
      display();
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

  // 勉強ページに遷移した時の処理（CSVデータを並べて表示：hoge色のトランプ画像、title（上）、説明（下））
  function display() {
    const study = document.getElementById('study');
    result.map((r, i) => {
      if (i === 0) return;
      //１枚毎のトランプとなるdiv要素作成
      const div = document.createElement('div');
      div.classList.add('study-container');
      const divLeft = div.appendChild(document.createElement("div"));
      divLeft.classList.add('card');
      const divRight = div.appendChild(document.createElement("div"));
      divRight.classList.add('name-desc');
      //背景色を設定
      divLeft.style.backgroundColor = r[2];
      //色の名称を設定
      const pName = divRight.appendChild(document.createElement("p"));
      pName.textContent = r[1];
      //色の説明を設定
      const pDesc = divRight.appendChild(document.createElement("p"));
      pDesc.textContent = r[3];
      //study要素に追加
      study.append(div);
    });
    // ボタン追加
    const buttonBox = document.body.appendChild(document.createElement("div"));
    buttonBox.classList.add('button-box');
    const button = buttonBox.appendChild(document.createElement("a"));
    button.classList.add('button');
    button.setAttribute('href', '/');
    button.textContent = 'これでもう大丈夫やね♪';
  }

  getCSVAndDisplay(); //最初に実行される
});