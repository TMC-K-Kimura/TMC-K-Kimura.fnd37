'use strict'
// 1行目に記載している 'use strict' は削除しないでください


function alertmessage() {
  alert(
    "購入品名称： " + document.getElementById("myForm").purchasedItems.value + "\n" +
    "金額： " + document.getElementById("myForm").ammount.value + "\n" +
    "勘定科目： " + document.getElementById("myForm").accountItem1.value
  );
}

// プルダウン要素を取得
const selectElement = document.getElementById("accountItem1");

selectElement.addEventListener("change", function() {
  alert("選択された値は： " + this.value);
});
