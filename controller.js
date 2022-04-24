const { create } = require("domain");
const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceFunc = require("./module/replaceFunc.js");

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

const dataD = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(dataD);
// console.log(dataObj);

const server = http.createServer((req, res) => {
  const changeCard = dataObj
    .map((val) => {
      return replaceFunc(cardHtml, val);
    })
    .join("");

  let urlcha = req.url;
  let output = html.replace("{cardHtml}", changeCard);

  if (urlcha == "/overview") {
    res.writeHead(200, {
      "content-type": "text.html",
      "mening-headrim": "muvaffaqqiyatli ishlamoqda",
    });
    res.end(output);
  }
});
server.listen("8001", "127.0.0.1");
