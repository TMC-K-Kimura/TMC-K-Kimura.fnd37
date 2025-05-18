'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// カウントダウンタイマー
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const timerDisplay = document.getElementById("timer");

  if (startButton && timerDisplay) {
    startButton.addEventListener("click", function () {
      startButton.style.display = "none"; // ボタンを非表示にする
      let duration = 4 * 60; // 4分（秒）

      const interval = setInterval(() => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        timerDisplay.textContent = 
          String(minutes).padStart(2, '0') +
          ":" +
          String(seconds).padStart(2, '0');

        if (--duration < 0) {
          clearInterval(interval);
          timerDisplay.textContent = "ご清聴ありがとうございました！";
        }
      }, 1000);
    });
  }
});

// 更新日時を取得し表示
window.addEventListener('DOMContentLoaded', () => {
  const updateDate = new Date();
  const formattedDate = 
    updateDate.getFullYear() + '年' +
    (updateDate.getMonth() + 1) + '月' +
    updateDate.getDate() + '日';
  document.getElementById('updateDate').textContent = '更新日：' + formattedDate;
});

// プルダウン要素の変更イベント発生時の処理
// document.addEventListener("DOMContentLoaded", function() {
//   const selectElement = document.getElementById("accountItem1");
//   selectElement.addEventListener("change", function() {
//     alert("選択された上位勘定科目： " + this.value);
//   });
// });

// プルダウン要素の変更イベント発生時に下位勘定科目の選択肢を設定する
document.addEventListener("DOMContentLoaded", function () {
  const accountItem1 = document.getElementById("accountItem1");
  const accountItem2 = document.getElementById("accountItem2");

  const subOptions = {
    "交際費": ["接待飲食費", "贈答品費", "イベント・式典参加費", "娯楽費", "慶弔費", "その他供応費"],
    "会議費": ["会議用飲食費", "会場費", "会議資料作成費", "通信費・オンライン会議費", "備品・消耗品費"],
    "法定外福利厚生費": ["社員旅行費", "健康診断費", "社内イベント費", "慶弔見舞金", "福利厚生サービス利用料"]
  };

  accountItem1.addEventListener("change", function () {
    const selected = this.value;
    // 下位科目の選択肢を一度クリア
    accountItem2.innerHTML = '<option value="">選択してください</option>';
    // 選ばれた上位科目に対応する下位科目を追加
    if (subOptions[selected]) {
      subOptions[selected].forEach(function (item) {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        accountItem2.appendChild(option);
      });
    }
  });
});

// プルダウン要素の変更イベント発生時に該当する科目の詳細説明ページのリンクを表示する
document.addEventListener("DOMContentLoaded", function () {
  const accountItem1 = document.getElementById("accountItem1");
  const accountItem1Link = document.getElementById("accountItem1Link");

  const links = {
    "交際費": "https://toyota.jp/crownestate/?padid=from_tjptop_pr_crownestate",
    "会議費": "https://toyota.jp/grcorolla/?padid=from_tjptop_pr_grcorolla",
    "法定外福利厚生費": "https://toyota.jp/landcruiser250/?padid=from_tjptop_pr_landcruiser250"
  };

  accountItem1.addEventListener("change", function () {
    const selected = accountItem1.value;
    if (links[selected]) {
      accountItem1Link.innerHTML = 
        '<a href="' +
        links[selected] +
        '" target="_blank">' +
        selected + 'の詳細はこちら</a>';
    } else {
      accountItem1Link.innerHTML = "";
    }
  });
});

// Form項目の入力・変更イベントの取得
document.addEventListener("DOMContentLoaded", function () {
  const purchasedItems = document.getElementById("purchasedItems");
  const amount = document.getElementById("amount");
  const accountItem1 = document.getElementById("accountItem1");
  const accountItem2 = document.getElementById("accountItem2");
  purchasedItems.addEventListener("input", checkFormValidity);
  amount.addEventListener("input", checkFormValidity);
  accountItem1.addEventListener("change", checkFormValidity);
  accountItem2.addEventListener("change", checkFormValidity);
});

// Formの入力内容のすべての入力が揃っていればボタンを有効化、そうでなければ無効化
function checkFormValidity() {
  const name = document.getElementById("purchasedItems").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const account1 = document.getElementById("accountItem1").value;
  const account2 = document.getElementById("accountItem2").value;
  const button = document.getElementById("submitButton");
  if (name !== "" && amount !== "" && account1 !== "" && account2 !== "") {
  button.disabled = false;
  } else {
    button.disabled = true;
  }
}


// 送信ボタンクリック時の処理
function alertMessage() {
  const amount = Number(document.getElementById("amount").value);
  const taxIncluded = Math.trunc(amount * 1.1);
  let yenFormat = {};
  yenFormat = Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  });
  alert(
    "購入品名称： " + document.getElementById("purchasedItems").value + "\n" +
    "税抜金額： " + yenFormat.format(amount) + "\n" +
    "税込金額： " + yenFormat.format(taxIncluded) + "\n" +
    "上位勘定科目： " + document.getElementById("accountItem1").value + "\n" +
    "下位勘定科目： " + document.getElementById("accountItem2").value
  );
}

