'use strict';

// カウントダウンタイマー
document.addEventListener("DOMContentLoaded", initializeCountDownTimer);
function initializeCountDownTimer() {
  const startButton = document.getElementById("startButton");
  const timerDisplay = document.getElementById("timer");
  if (startButton && timerDisplay) {
    startButton.addEventListener("click", updateCountDownTimer);
  }
  function updateCountDownTimer() {
    startButton.style.display = "none";
    let duration = 4 * 60;
    const interval = setInterval(() => {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      timerDisplay.textContent =
        String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
      if (--duration < 0) {
        clearInterval(interval);
        timerDisplay.textContent = "ご清聴ありがとうございました！";
      }
    }, 1000);
  }
}

// 更新日時の表示
const updateDate = new Date();
const formattedDate =
  updateDate.getFullYear() + '年' +
  (updateDate.getMonth() + 1) + '月' +
  updateDate.getDate() + '日';
const updateDateElement = document.getElementById('updateDate');
if (updateDateElement) {
  updateDateElement.textContent = '更新日：' + formattedDate;
}

// 勘定科目の下位選択肢設定
const accountItem1 = document.getElementById("accountItem1");
const accountItem2 = document.getElementById("accountItem2");
const subOptions = {
  "交際費": ["接待飲食費", "贈答品費", "イベント・式典参加費", "娯楽費", "慶弔費", "その他供応費"],
  "会議費": ["会議用飲食費", "会場費", "会議資料作成費", "通信費・オンライン会議費", "備品・消耗品費"],
  "法定外福利厚生費": ["社員旅行費", "健康診断費", "社内イベント費", "慶弔見舞金", "福利厚生サービス利用料"]
};
if (accountItem1 && accountItem2) {
  accountItem1.addEventListener("change", updateSubAccountOptions);
}
function updateSubAccountOptions() {
  const selected = accountItem1.value;
  accountItem2.innerHTML = '<option value="">選択してください</option>';
  if (subOptions[selected]) {
    for (let i = 0; i < subOptions[selected].length; i++) {
      const item = subOptions[selected][i];
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      accountItem2.appendChild(option);
    }
  }
  toggleSubmitButtonState();
}

// 勘定科目のリンク表示
const accountItem1Link = document.getElementById("accountItem1Link");
const links = {
  "交際費": "https://toyota.jp/crownestate/?padid=from_tjptop_pr_crownestate",
  "会議費": "https://toyota.jp/grcorolla/?padid=from_tjptop_pr_grcorolla",
  "法定外福利厚生費": "https://toyota.jp/landcruiser250/?padid=from_tjptop_pr_landcruiser250"
};
if (accountItem1 && accountItem1Link) {
  accountItem1.addEventListener("change", displayAccountLink);
}
function displayAccountLink() {
  const selected = accountItem1.value;
  if (links[selected]) {
    accountItem1Link.innerHTML =
      '<a href="' + links[selected] + '" target="_blank">' +
      selected + 'の詳細はこちら</a>';
  } else {
    accountItem1Link.innerHTML = "";
  }
}

// 入力・変更イベントの取得
const purchasedItems = document.getElementById("purchasedItems");
const amount = document.getElementById("amount");
if (purchasedItems) {
  purchasedItems.addEventListener("input", toggleSubmitButtonState);
}
if (amount) {
  amount.addEventListener("input", toggleSubmitButtonState);
}
if (accountItem1) {
  accountItem1.addEventListener("change", toggleSubmitButtonState);
}
if (accountItem2) {
  accountItem2.addEventListener("change", toggleSubmitButtonState);
}

  // 送信ボタンクリック時の処理
const submitButton = document.getElementById("submitButton");
if (submitButton) {
  submitButton.addEventListener("click", alertMessage);
}

// ボタンの有効化・無効化
function toggleSubmitButtonState() {
  const name = document.getElementById("purchasedItems")?.value.trim();
  const amount = document.getElementById("amount")?.value.trim();
  const account1 = document.getElementById("accountItem1")?.value;
  const account2 = document.getElementById("accountItem2")?.value;
  const button = document.getElementById("submitButton");
  if (!button) {
    return;
  }
  if (name && amount && account1 && account2) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

// 送信ボタン押下時にアラートを表示
function alertMessage() {
  const amount = Number(document.getElementById("amount").value);
  const taxIncluded = Math.trunc(amount * 1.1);
  const yenFormat = Intl.NumberFormat('ja-JP', {
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
