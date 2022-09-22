"use strict";

//Khai báo các bộ chọn dùng chung
const sidebar = document.getElementById("sidebar");
const h3Collection = document.getElementsByTagName("h3");


//Lưu và lấy dữ liệu từ Storage
const saveToStorage = (key, value) => localStorage.setItem(key, value);
const getFromStorage = (key) => localStorage.getItem(key);



//Khai báo biến str hiển thị thông báo lỗi khi nhập dữ liệu
let strErr;

//Các Phương thức dùng chung

//Add Method
const addNew = function (object, arr, keyJsonOfArray,flag) {
  const parasObject = Object.keys(object)
    .map((key) => [object[key]])
    .toString()
    .split(",");

  if (ValidateInput(parasObject, flag)) {
    if (arr === null) {
      arr = new Array();
      arr.shift();
    }
    arr.push(object);
    saveToStorage(keyJsonOfArray, JSON.stringify(arr));
    ClearInput();
    RenderTable(arr,flag);
  } else alert(strErr.trimEnd());
};
//Thay đổi trạng thái sidebar
const changeStatusSidebar = () => sidebar.classList.toggle("active");
//Load trang
const loadPages = function (arr, flag) {
  if (sidebar.classList.contains("active")) {
    h3Collection[0].addEventListener("mouseover", () => {
      h3Collection[0].style.cursor = "pointer";
    });
  }
  RenderTable(arr, flag);
};

//Sự kiện nút sidebar
sidebar.addEventListener("click", changeStatusSidebar);
