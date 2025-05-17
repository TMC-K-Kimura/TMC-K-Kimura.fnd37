'use strict'
// 1行目に記載している 'use strict' は削除しないでください


function alert_message() {
  alert(
    "購入品名称： " + document.getElementById("myForm").purchasedItems.value + "\n" +
    "金額： " + document.getElementById("myForm").ammount.value + "\n" +
    "勘定科目： " + document.getElementById("myForm").accountItem1.value
  );
}

// プルダウン要素を取得
const accountItem1 = document.getElementById('accountItem1');

// 選択イベントのリスナーを設定
accountItem1.addEventListener('change', (event) => {
    // 選択された項目を取得
    const selectedItem = event.target.value;
    console.log(`選択された項目: ${selectedItem}`);
  }
);
