"use strict";
//-----------------------Flag = 1-------------------------//
//Khai báo các biến bộ chọn
const btnHealthy = document.getElementById("healthy-btn");
const btnBMI = document.getElementById("bmi-btn");

// Khai báo biến kiểm tra thú cưng khỏe mạnh
let healthyCheck = false;

//----KHAI BÁO CÁC PHƯƠNG THỨC-----//

//Thêm 1 thú cưng mới
const addNewPet = function () {
  strErr = "";
  let pet = {
    id: petID.value,
    petName: petName.value,
    age: Number(petAge.value),
    type: petType.value,
    weight: Number(petWeight.value),
    length: Number(petLength.value),
    color: petColor1.value,
    breed: petBreed.value,
    vaccinated: isVaccinated.checked,
    dewormed: isDewormed.checked,
    sterlilized: isSterilized.checked,
    bmi: "?",
    date: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  };
  addNew(pet, arrPets, "arrPets", 1);
};

//----KHAI BÁO CÁC SỰ KIỆN----

//Sự kiện nút Submit
btnSubmit.addEventListener("click", addNewPet);

//Sự kiện nút Show healthy pet
btnHealthy.addEventListener("click", () => {
  let arrPetsStrong = []; // mảng pet khỏe mạnh
  /* Nút btnHealthy = true (hiển thị toàn bộ pet khỏe mạnh <=> arrPetsStrong),
   false là danh sách pet <=> arrPets*/
  healthyCheck = healthyCheck ? false : true;
  if (healthyCheck) {
    btnHealthy.textContent = "Show All Pet";
    if (arrPets !== null) {
      for (let i = 0; i < arrPets.length; i++) {
        if (
          arrPets[i].vaccinated &&
          arrPets[i].dewormed &&
          arrPets[i].sterlilized
        )
          arrPetsStrong.push(arrPets[i]);
      }
    }
    RenderTable(arrPetsStrong, 1);
  } else {
    btnHealthy.textContent = "Show Healthy Pet";
    RenderTable(arrPets, 1);
  }
});

//Sự kiện nút btnBMI: Tính chỉ số BMI của pet
btnBMI.addEventListener("click", () => {
  for (let i = 0; i < arrPets.length; i++) {
    if (arrPets[i].type === "Dog")
      arrPets[i].bmi = String(
        (arrPets[i].weight * 703) / arrPets[i].length ** 2
      ).slice(0, 4);
    else if (arrPets[i].type === "Cat")
      arrPets[i].bmi = String(
        (arrPets[i].weight * 886) / arrPets[i].length ** 2
      ).slice(0, 4);
  }
  saveToStorage("arrPets", JSON.stringify(arrPets));
  RenderTable(arrPets, 1);
});

//Sự kiện khi load trang
window.addEventListener("load", loadPages(arrPets, 1));
//Sự kiện Chọn Loại thú cưng
petType.addEventListener("change", () => {
  getBreedsFromTypePet(petType.value);
});