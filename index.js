const ITEMS = {
  Apple: 60,
  Orange: 25,
};

const formatCurrency = (sum) => {
  if (
    sum === undefined ||
    Number.isNaN(parseInt(sum)) ||
    sum === 0 ||
    sum.toString().len == 1
  ) {
    return "0.00";
  }

  var sumStr = sum.toString();
  if (sumStr.length == 2) {
    return "0." + sumStr;
  } else {
    var len = sumStr.length;
    return sumStr.slice(0, len - 2) + "." + sumStr.slice(len - 2);
  }
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const createList = (scannedItems) =>
  scannedItems.capitalize().split(" ").join("").split(",");
const isValid = (item) => item in ITEMS;
const getTotal = (itemList) => {
  let appleNum = 0;
  let orangeNum = 0;
  for (let i = 0; i < itemList.length; i++) {
    if (itemList[i] == "Apple") {
      appleNum++;
    } else {
      orangeNum++;
    }
  }
  let total =
    ITEMS.Apple * Math.ceil(appleNum / 2) +
    ITEMS.Orange * Math.floor(orangeNum / 3) * 2 +
    (orangeNum % 3) * ITEMS.Orange;
  let discount =
    Math.floor(appleNum / 2) * ITEMS.Apple +
    Math.floor(orangeNum / 3) * ITEMS.Orange;
  return { total, discount };
};

console.log("---------------------------------------------");
console.log("           WELCOME TO LEO MARKET             ");
console.log("   You can buy fresh Apple and Orange here   ");
console.log("---------------------------------------------");

const scanner = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

scanner.question("Please scan your items : ", (scannedItems) => {
  let itemList = createList(scannedItems);
  if (itemList.every(isValid)) {
    let { total, discount } = getTotal(itemList);
    console.log("Total    : £" + formatCurrency(total + discount));
    console.log("Discount : £" + formatCurrency(discount));
    console.log("Summary  : £" + formatCurrency(total));
  } else {
    console.log('You can only scan "Apple" or "Orange"');
  }
  scanner.close();
});
