"use strict";
/* ------------------------Flag = 3------------------------ */

//---KHAI BÁO CÁC BIẾN---//

//Nút Tìm kiếm
const btnFind = document.getElementById("find-btn");
// Mảng breed
let arrBreeds = JSON.parse(getFromStorage("arrBreeds"));
arrBreeds == null ? (arrBreeds = []) : {};
//Mảng danh sách tìm kiếm
let arrSearch;


/* KHAI BÁO CÁC PHƯƠNG THỨC CHO TÌM KIẾM */

//Load danh sách Breed/Type
getDataBreed();
function getDataBreed() {
  petBreed.innerHTML = "<option>Select Breed</option>";
  arrBreeds.forEach((value) => {
    const options = document.createElement("option");
    options.innerHTML = `${value.name}`;
    petBreed.appendChild(options);
  });
}

//Phương thức tìm kiếm
function searchData(dataInput, index) {
  /*
  dataInput: là giá trị của thuộc tính mảng pet
  index: là vị trí của thuộc tính đó
  Nếu vị trí 0 hoặc 1 <=> trả về id hoặc petName
  Nếu vị trí 2 trả về vị trí của thuộc tính type
  Nếu vị trí 3 trả về vị trí của thuộc tính breed
  Các vị trí còn lại lần lượt là vaccinated, dewormed, sterlilized
  */
  if (index <= 1) {
    if (dataInput != "") {
      switch (index) {
        case 0:
          if (arrSearch.length <= 0) {
            arrSearch = arrPets.filter((value) =>
              value.id.toLowerCase().includes(dataInput.toLowerCase())
            );
          } else {
            arrSearch = arrSearch.filter((value) => {
              value.id.toLowerCase().includes(dataInput.toLowerCase());
            });
          }
          break;
        case 1:
          if (arrSearch.length <= 0) {
            arrSearch = arrPets.filter((value) =>
              value.petName.toLowerCase().includes(dataInput.toLowerCase())
            );
          } else {
            arrSearch = arrSearch.filter((value) =>
              value.petName.toLowerCase().includes(dataInput.toLowerCase())
            );
          }
          // console.log(arrSearch);
          break;
      }
    }
  } else if (index == 2) {
    if (dataInput != "Select Type") {
      if (arrSearch.length <= 0) {
        arrSearch = arrPets.filter((value) => value.type === dataInput);
      } else {
        arrSearch = arrSearch.filter(
          (value) => value.type.trim() === dataInput.trim()
        );
      }
    }
  } else if (index == 3) {
    if (dataInput != "Select Breed") {
      if (arrSearch.length <= 0) {
        arrSearch = arrPets.filter((value) => value.breed === dataInput);
      } else {
        arrSearch = arrSearch.filter(
          (value) => value.breed.trim() === dataInput.trim()
        );
      }
    }
  } else {
    dataInput === 'true'?dataInput = true: dataInput = false;
    switch (index) {
      case 4:
        if (dataInput) {
          if (arrSearch.length <= 0) {
            arrSearch = arrPets.filter(
              (value) => value.vaccinated === dataInput
            );
          } else {
            arrSearch = arrSearch.filter(
              (value) => value.vaccinated === dataInput
            );
          }
        }
        break;
      case 5:
        if (dataInput) {
          if (arrSearch.length <= 0) {
            arrSearch = arrPets.filter(
              (value) => value.dewormed === dataInput
            );
          } else {
            arrSearch = arrSearch.filter(
              (value) => value.dewormed === dataInput
            );
          }
        }
        break;
      case 6:
        if (dataInput) {
          if (arrSearch.length <= 0) {
            arrSearch = arrPets.filter(
              (value) => value.sterlilized === dataInput
            );
          } else {
            arrSearch = arrSearch.filter(
              (value) => value.sterlilized === dataInput
            );
          }
        }
        break;
    }
  }
}
/*KHAI BÁO SỰ KIỆN*/

//Sự kiện nút btnFind
btnFind.addEventListener("click", () => {
  //Gán mảng tìm kiếm = rỗng mỗi khi nhấn nút
  arrSearch = [];

  //Lây dữ liệu từ input gán vào đối tượng pet
  let pet = {
    id: petID.value,
    petName: petName.value,
    type: petType.value,
    breed: petBreed.value,
    vaccinated: isVaccinated.checked,
    dewormed: isDewormed.checked,
    sterilized: isSterilized.checked,
  };
  //Nếu người dùng không nhập gì => trả về mảng arrPets đầy đủ, Ngược lại trả về theo các giá trị được nhập vào
  if (
    pet.id == "" &&
    pet.petName == "" &&
    pet.type == "Select Type" &&
    pet.breed == "Select Breed" &&
    pet.vaccinated == false &&
    pet.dewormed == false &&
    pet.sterilized == false
  ) {
    RenderTable(arrPets, 3);
  } else {
    //Chuyển các thuộc tính của đối tượng pet từ object -> mảng
    let petData = Object.keys(pet)
      .map((key) => [pet[key]])
      .toString()
      .split(",");
    //Kiểm tra từng giá trị của mản petData
    petData.forEach((value, index) => {
      searchData(value, index);
    });
    //Trả về kết quả mảng arrSearch tìm kiếm được theo các tiêu chí
    RenderTable(arrSearch, 3);
  }
});
