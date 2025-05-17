'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// プルダウン要素の変更イベントを取得
document.addEventListener("DOMContentLoaded", function() {
  const selectElement = document.getElementById("accountItem1");
  selectElement.addEventListener("change", function() {
    alert("選択された値は： " + this.value);
  });
});

// 入力内容を表示
function alertMessage() {
  alert(
    "購入品名称： " + document.getElementById("myForm").purchasedItems.value + "\n" +
    "金額： " + document.getElementById("myForm").amount.value + "\n" +
    "勘定科目： " + document.getElementById("accountItem1").accountItem1.value
  );
}

