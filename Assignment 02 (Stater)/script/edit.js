"use strict";
//---------------Flag = 2-----------------
//-----KHAI BÁO CÁC BIẾN BỘ CHỌN------//
const containerForm = document.getElementById("container-form");

//-----KHAI BÁO CÁC PHƯƠNG THỨC-----//

//Phương thức lấy đối tượng trong mảng arrPets bằng id
function editPet(petID) {
  return arrPets.filter((value) => value.id === petID);
}
//-----KHAI BÁO CÁC SỰ KIỆN-----//
//load trang
window.addEventListener("load", () => {
  RenderTable(arrPets, 2);
});
//sự kiện nút submit
btnSubmit.addEventListener("click", () => {
  strErr = "";
  if (petID.value !== null && petID.value !== "") {
    // Gán lại giá trị từ input
    editPet(petID.value)[0].petName = petName.value;
    editPet(petID.value)[0].age = petAge.value;
    editPet(petID.value)[0].type = petType.value;
    editPet(petID.value)[0].weight = petWeight.value;
    editPet(petID.value)[0].length = petLength.value;
    editPet(petID.value)[0].color = petColor1.value;
    editPet(petID.value)[0].breed = petBreed.value;
    editPet(petID.value)[0].vaccinated = isVaccinated.checked;
    editPet(petID.value)[0].dewormed = isDewormed.checked;
    editPet(petID.value)[0].sterlilized = isSterilized.checked;
    //Convert sang Arr
    const dataPetEdit = Object.keys(editPet(petID.value)[0])
      .map((key) => [editPet(petID.value)[0][key]])
      .toString()
      .split(",");
    //Gán và lưu data xuống localStorage
    for (let i = 0; i < arrPets.length; i++) {
      if (arrPets[i].id === dataPetEdit[0]) {
        //Kiểm tra dữ liệu
        if (ValidateInput(dataPetEdit, 2)) {
          arrPets[i].petName = dataPetEdit[1];
          arrPets[i].age = dataPetEdit[2];
          arrPets[i].type = dataPetEdit[3];
          arrPets[i].weight = dataPetEdit[4];
          arrPets[i].length = dataPetEdit[5];
          arrPets[i].color = dataPetEdit[6];
          arrPets[i].breed = dataPetEdit[7];
          dataPetEdit[8]=='true'?arrPets[i].vaccinated = true: arrPets[i].vaccinated = false;
          dataPetEdit[9]=='true'?arrPets[i].dewormed = true: arrPets[i].dewormed = false;
          dataPetEdit[10]=='true'?arrPets[i].sterlilized = true: arrPets[i].sterlilized = false;
          saveToStorage("arrPets", JSON.stringify(arrPets));
          RenderTable(arrPets, 2);
          containerForm.classList.toggle("hide");
        } else alert(strErr);
      }
    }
  }
});
//Sự kiện Chọn Loại thú cưng
petType.addEventListener("change", () => {
  getBreedsFromTypePet(petType.value);
});