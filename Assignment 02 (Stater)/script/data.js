"use strict";

//------KHAI BÁO BỘ CHỌN-------//
const btnImport = document.getElementById("import-btn");
const btnExport = document.getElementById("export-btn");
const inputFile = document.getElementById("input-file");


//Biến
let arrPets = JSON.parse(getFromStorage("arrPets"));
let arrBreeds = JSON.parse(getFromStorage("arrBreeds"));

//Phương thức Lưu data và tải xuống
function saveDynamicDataToFile() {
  const srcPets = JSON.stringify(arrPets);
  const srcBreeds = JSON.stringify(arrBreeds);

  const blob = new Blob([srcPets], { type: "text/plain;charset=utf-8" });
  const blob1 = new Blob([srcBreeds], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "srcPets.JSON");
  saveAs(blob1, "srcBreeds.JSON");
}

//Export data Event
btnExport.addEventListener("click", saveDynamicDataToFile);

//Import data Event
btnImport.addEventListener("click", () => {
  const file = inputFile.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      if (file.name.includes("srcPets")) {
        arrPets = evt.target.result;
        saveToStorage("arrPets", arrPets);
      } else if (file.name.includes("srcBreeds")) {
        arrBreeds = evt.target.result;
        saveToStorage("arrBreeds", arrBreeds);
      }
      alert("Import data Success!!");
    };
    reader.onerror = function (evt) {
      alert("Error reading file");
    };
  }
});
