"use strict";

//-----KHAI BÁO CÁC BIẾN BỘ CHỌN-----//

const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const bodyContent = document.getElementById("tbody");

// Mảng breed
let arrBreeds = JSON.parse(getFromStorage("arrBreeds"));
arrBreeds==null?arrBreeds=[]:{};
//-----KHAI BÁO CÁC PHƯƠNG THỨC-----//

//ValidateInput
function ValidateInput(arr) {
  strErr = "";
  let check = true;
  if (arr[0] === null || arr[0] === "") {
    strErr += "Breed is not empty! \n";
    check = false;
  }
  if (arr[1] == "Select Type") {
    strErr += "Please chocie Type! \n";
    check = false;
  }
  return check;
}
//ClearInput
function ClearInput() {
  inputBreed.value = "";
  inputType.value = inputType[0].value;
}
//RenderTable
function RenderTable(arr) {
  bodyContent.innerHTML = "";
  if (arr !== null) {
    if (arr[0] === null) arr.splice(0, 1);
    for (let i = 0; i < arr.length; i++) {
      //Tạo 1 hàng mới
      const row = document.createElement("tr");
      //Render dữ liệu vào 1 hàng
      row.innerHTML = `
              <th scope="row">${i + 1}</th>
							<td>${arr[i].name}</td>
							<td>${arr[i].type}</td>
							<td><button type="button" class="btn btn-danger" id="btnDelete--${i}">Delete</button></td>
      `;
      bodyContent.appendChild(row);

      //Tạo sự kiện cho từng nút xóa
      const btnDelete = document
        .getElementById(`btnDelete--${i}`)
        .addEventListener("click", () => {
          //Xóa dòng hiện tại được chọn. Nếu ok thì xóa hàng hiện tại và tải lại danh sách
          if (confirm("Are you sure?")) {
            //tải lại danh sách
            arr.splice(i, 1);
            //Lưu vào Storage
            saveToStorage("arrBreeds", JSON.stringify(arr));
            // tải lại danh sách pet
            RenderTable(arr);
          }
        });
    }
  }
}
//Thêm 1 breed
const addNewBreed = function () {
  let newBreed = {
    name: inputBreed.value,
    type: inputType.value,
  };
  addNew(newBreed, arrBreeds, "arrBreeds");
  // if (ValidateInput(newBreed.name, newBreed.type)) {
  //   if(arrBreeds[0] == null) arrBreeds.shift();
  //   arrBreeds.push(newBreed);
  //   saveToStorage('arrBreeds', JSON.stringify(arrBreeds));
  //   console.log(arrBreeds);
  // }
  // else alert(strErr.trimEnd());
};
//-----KHAI BÁO CÁC SỰ KIỆN-----//
btnSubmit.addEventListener("click", addNewBreed);
window.addEventListener("load", loadPages(arrBreeds));
