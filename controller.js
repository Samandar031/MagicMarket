const { create } = require("domain");
const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceFunc = require("./module/replaceFunc.js");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// let login = document.querySelector(".login_btn_l");
// let create = document.querySelector(".sign_btn_s");

// let loginPage = document.querySelector(".register_login");
// let createPage = document.querySelector(".register_sign");

// let a = 1;
// let b = 1;

// create.addEventListener("click", function (e) {
//   a++;
//   b++;
//   if (b == 2) {
//     createPage.style.transform = `translateY(${-36 * b}rem)`;
//     b = 1;
//   }
//   if (a == 2) {
//     loginPage.style.transform = `translateY( ${0 * a}rem)`;
//     a = 1;
//   }
// });

// login.addEventListener("click", function (e) {
//   a++;
//   b++;
//   if (b == 2) {
//     createPage.style.transform = `translateY(${-13 * b}rem)`;
//     b = 1;
//   }
//   if (a == 2) {
//     loginPage.style.transform = `translateY(${30 * a}rem)`;
//     a = 1;
//   }
// });

// // popup
// let popupBtn = document.querySelector(".card_btn");
// let popupCard = document.querySelector(".popup");
// let popupClose = document.querySelector(".popup_close");

// popupBtn.addEventListener("click", function () {
//   popupCard.style.display = "block";
// });

// popupClose.addEventListener("click", function () {
//   popupCard.style.display = "none";
// });

// // register

// let registerBtn = document.querySelector(".nav_sign");
// let registerCard = document.querySelector(".register");
// let registerClose = document.querySelector(".register_close");

// registerBtn.addEventListener("click", function () {
//   registerCard.style.display = "block";
// });

// registerClose.addEventListener("click", function () {
//   registerCard.style.display = "none";
// });

let css = fs.readFileSync("./dist/index.b10d73a7.css", "utf-8");
let html = fs.readFileSync("./index.html", "utf-8");

let cardHtml = fs.readFileSync("./templates/card.html", "utf-8");

let popup = fs.readFileSync("./templates/popup.html", "utf-8");

const dataD = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(dataD);

const server = http.createServer((req, res) => {
  const changeCard = dataObj
    .map((val) => {
      return replaceFunc(cardHtml, val);
    })
    .join("");

  let kelayotganUrl = req.url;
  let query = +url.parse(kelayotganUrl, true).query.id;

  let output = html.replace("{cardHtml}", changeCard);

  if (kelayotganUrl == "/overview") {
    res.writeHead(200, {
      "content-type": "text.html",
      "mening-headrim": "muvaffaqqiyatli ishlamoqda",
    });
    res.end(output);
  } else if (kelayotganUrl == `/product?id=${query}`) {
    let objs = dataObj.find((val) => val.id == query);

    let category = objs.category;

    let arr = [];
    let rekomendatsiya = dataObj.forEach((el) => {
      if (el.category == category) {
        arr.push(el);
      }
    });

    let topish = arr.findIndex((val) => {
      return val.id == query;
    });
    arr.splice(topish, 1);
    let popupQoshilgan = arr
      .map((val) => {
        return replaceFunc(cardHtml, val);
      })
      .join("");

    let popupHtml = replaceFunc(popup, objs);
    const oxiri = popupHtml.replace("{cardHtml}", popupQoshilgan);

    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(oxiri);
  }
});
server.listen("8001", "127.0.0.1");
