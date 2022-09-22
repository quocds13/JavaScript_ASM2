"use strict";

const petID = document.getElementById("input-id");
const petName = document.getElementById("input-name");
const petAge = document.getElementById("input-age");
const petType = document.getElementById("input-type");
const petWeight = document.getElementById("input-weight");
const petLength = document.getElementById("input-length");
const petColor1 = document.getElementById("input-color-1");
const petBreed = document.getElementById("input-breed");
const isVaccinated = document.getElementById("input-vaccinated");
const isDewormed = document.getElementById("input-dewormed");
const isSterilized = document.getElementById("input-sterilized");
const bodyContent = document.getElementById("tbody");
const btnSubmit = document.getElementById("submit-btn");

//Mảng arrPet lưu trữ các thú cưng lấy từ Storage
const arrPets = JSON.parse(getFromStorage("arrPets"));
//Lấy data Breed từ loại thú cưng
function getBreedsFromTypePet(typePet) {
  petBreed.innerHTML = "<option>Select Breed</option>";
  const listBreedByType = JSON.parse(getFromStorage("arrBreeds")).filter(
    (value) => {
      return value.type === typePet;
    }
  );
  listBreedByType.forEach((value) => {
    const option = document.createElement("option");
    option.innerHTML = `${value.name}`;
    petBreed.appendChild(option);
  });
}
//Clear input
function ClearInput() {
  petID.value = "";
  petName.value = "";
  petAge.value = "";
  petType.value = petType[0].value;
  petWeight.value = "";
  petLength.value = "";
  petColor1.value = "#000000";
  petBreed.value = petBreed[0].value;
  isVaccinated.checked = false;
  isDewormed.checked = false;
  isSterilized.checked = false;
}

//Render table (flag = 1 là trang index.html , flag = 2 là trang edit.html)
function RenderTable(arr, flag) {
  bodyContent.innerHTML = "";
  if (arr !== null) {
    if (arr[0] === null) arr.splice(0, 1);
    for (let i = 0; i < arr.length; i++) {
      //Tạo 1 hàng mới
      const row = document.createElement("tr");
      //Render dữ liệu vào 1 hàng
      row.innerHTML = `
                <th scope="row">${arr[i].id}</th>
                              <td>${arr[i].petName}</td>
                              <td>${arr[i].age}</td>
                              <td>${arr[i].type}</td>
                              <td>${arr[i].weight} kg</td>
                              <td>${arr[i].length} cm</td>
                              <td>${arr[i].breed}</td>
                              <td>
                                  <i class="bi bi-square-fill" style="color: ${
                                    arr[i].color
                                  }"></i>
                              </td>
                              <td><i class="bi ${
                                arr[i].vaccinated
                                  ? "bi-check-circle-fill"
                                  : "bi bi-x-circle-fill"
                              }"></i></td>
                              <td><i class="bi ${
                                arr[i].dewormed
                                  ? "bi-check-circle-fill"
                                  : "bi bi-x-circle-fill"
                              }"></i></td>
                              <td><i class="bi ${
                                arr[i].sterlilized
                                  ? "bi-check-circle-fill"
                                  : "bi bi-x-circle-fill"
                              }"></i></td>
                              ${flag === 1 ? `<td>${arr[i].bmi}</td>` : ""}
                                <td>${arr[i].date}</td>
                                ${
                                  flag === 1
                                    ? `<td><button type="button" class="btn btn-danger" id="btnDelete--${i}">Delete</button>
                                </td>`
                                    : ''
                                }
                                ${
                                  flag === 2
                                    ? `<td><button type="button" class="btn btn-warning" id="btnEdit--${i}">Edit</button></td>
                                </td>`
                                    : ''
                                }
                                
        `;
      bodyContent.appendChild(row);

      //Tạo sự kiện cho từng nút xóa/edit
      switch (flag) {
        case 1:
          //Nút Delete
          const btnDelete = document
            .getElementById(`btnDelete--${i}`)
            .addEventListener("click", () => {
              //Xóa dòng hiện tại được chọn. Nếu ok thì xóa hàng hiện tại và tải lại danh sách
              if (confirm("Are you sure?")) {
                //tải lại danh sách
                //Lưu pet vừa xóa
                let deleteCurrentPet = arr.splice(i, 1);
                /* Nếu btnHealthy ở trạng thái true thì sau khi xóa pet ở danh sách pet khỏe mạnh,
              sẽ xóa thêm pet có id tương ứng trong danh sách arrPets (đảm bảo dữ liệu đồng bộ).
            */
                if (healthyCheck) {
                  arrPets.forEach((value, index) => {
                    if (value.id === deleteCurrentPet[0].id) {
                      arrPets.splice(index, 1);
                    }
                  });
                }
              }
              //Lưu vào Storage
              saveToStorage("arrPets", JSON.stringify(arrPets));
              // tải lại danh sách pet
              RenderTable(arr, flag);
            });
          break;
        case 2:
          //Nút Edit
          const btnEdit = document
            .getElementById(`btnEdit--${i}`)
            .addEventListener("click", () => {
              containerForm.classList.remove("hide");
              petID.value = arr[i].id;
              petName.value = arr[i].petName;
              petAge.value = arr[i].age;
              petType.value = arr[i].type;
              petWeight.value = arr[i].weight;
              petLength.value = arr[i].length;
              petColor1.value = arr[i].color;
              getBreedsFromTypePet(petType.value);
              petBreed.value = arr[i].breed;
              isVaccinated.checked = arr[i].vaccinated;
              isDewormed.checked = arr[i].dewormed;
              isSterilized.checked = arr[i].sterlilized;
            });
          break;
      }
    }
  }
}

//Kiểm tra dữ liệu đầu vào
function ValidateInput(arr, flag) {
  let isTrue = true;
  //Kiểm tra id trùng lặp hay k?
  if (flag === 1) {
    if (arrPets != null && arrPets[0] !== null) {
      if (arr[0] !== null && arr[0] !== "") {
        for (let i = 0; i < arrPets.length; i++) {
          if (arrPets[i].id === arr[0]) {
            strErr += "- ID must unique! \n";
            isTrue = false;
            break;
          }
        }
      } else {
        strErr += "- ID not empty!! \n";
      }
    }
  }
  //Kiểm tra tuổi
  if (Number(arr[2]) < 1 || Number(arr[2]) > 15) {
    strErr += "- Age must be between 1 and 15! \n ";
    isTrue = false;
  }
  //Kiểm tra loại thú cưng
  if (arr[3] === petType[0].value) {
    strErr += "- Please select Type! \n ";
    isTrue = false;
  }
  //Kiểm tra cân nặng
  if (Number(arr[4]) < 1 || Number(arr[4]) > 15) {
    strErr += "- Weight must be between 1 and 15! \n ";
    isTrue = false;
  }
  //Kiểm tra chiều dài
  if (Number(arr[5]) < 1 || Number(arr[5]) > 100) {
    strErr += "- Length must be between 1 and 100! \n ";
    isTrue = false;
  }

  //
  if (arr[7] === petBreed[0].value) {
    strErr += "- Please select Breed! \n";
    isTrue = false;
  }

  return isTrue;
}


