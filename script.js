'use strict'
// 1行目に記載している 'use strict' は削除しないでください


function alert_message() {
  alert(
    "購入品名称： " + document.getElementById("myForm").purchasedItems.value + "\n" +
    "金額： " + document.getElementById("myForm").ammount.value + "\n" +
    "勘定科目： " + document.getElementById("myForm").accountItem1.value
  );
}

let select = document.querySelector('[name="accountItem1"]');
select.onchange = event => { 
  console.log(select.selectedIndex);
}