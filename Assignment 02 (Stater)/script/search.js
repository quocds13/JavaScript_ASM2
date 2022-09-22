"use strict";
/* ------------------------Flag = 3------------------------ */
const btnFind = document.getElementById("find-btn");

//KHAI BÁO CÁC BIẾN
// const ulField =  document.createElement('ul');
// ulField.id = 'suggestions';

// Mảng breed
const arrBreeds = JSON.parse(getFromStorage("arrBreeds"));
/* KHAI BÁO CÁC PHƯƠNG THỨC CHO TÌM KIẾM */
//Load danh sách Breed/Type
function getDataBreed() {
  petBreed.innerHTML = "<option>Select Breed</option>";
  arrBreeds.forEach((value) => {
    const options = document.createElement("option");
    options.innerHTML = `${value.name}`;
    petBreed.appendChild(options);
  });
}
getDataBreed();

//Tìm kiếm thú cưng
function searchPet(pet) {
  const searchPet = [];
  const searchVaccinated = arrPets.filter(
    (value) => value.vaccinated === pet.vaccinated
  );
  const searchDewormed = arrPets.filter(
    (value) => value.dewormed === pet.dewormed
  );
  const searchSterilized = arrPets.filter(
    (value) => value.sterilized === pet.sterilized
  );
  let count;
  if (pet.id != "" && pet.id != null) {
    const searchID = arrPets.filter((value) =>
      value.id.toLowerCase().includes(pet.id.toLowerCase())
    );
    if (searchID.length > 0) {
      searchID.forEach((value) => {
        count = 0;
        if (searchPet.length > 0) {
          searchPet.forEach((obj) => {
            if (obj.id === value.id) count += 1;
          });
        }
        if (count < 1) searchPet.push(value);
      });
    }
  }
  if (pet.petName != "" && pet.petName != null) {
    const searchPetName = arrPets.filter((value) =>
      value.petName.toLowerCase().includes(pet.petName.toLowerCase())
    );
    if (searchPetName.length > 0) {
      searchPetName.forEach((value) => {
        count = 0;
        if (searchPet.length > 0) {
          searchPet.forEach((obj) => {
            if (obj.id === value.id) count += 1;
          });
        }
        if (count < 1) searchPet.push(value);
      });
    }
  }
  if (pet.type !== "Select Type" && pet.type != "" && pet.type != null) {
    const searchType = arrPets.filter((value) => value.type == pet.type);
    if (searchType.length > 0) {
      searchType.forEach((value) => {
        count = 0;
        if (searchPet.length > 0) {
          searchPet.forEach((obj) => {
            if (obj.id === value.id) count += 1;
          });
        }
        if (count < 1) searchPet.push(value);
      });
    }
  }
  if (pet.breed !== "Select Breed" && pet.breed != "" && pet.breed != null) {
    const searchBreed = arrPets.filter((value) => value.breed == pet.breed);
    if (searchBreed.length > 0) {
      searchBreed.forEach((value) => {
        count = 0;
        if (searchPet.length > 0) {
          searchPet.forEach((obj) => {
            if (obj.id === value.id) count += 1;
          });
        }
        if (count < 1) searchPet.push(value);
      });
    }
  }
//   if (searchVaccinated.length > 0) {
//     if (searchPet.length < 1) {
//       searchVaccinated.forEach((value) => {
//         searchPet.push(value);
//       });
//     }
//   }
//   if (searchDewormed.length > 0) {
//     if (searchPet.length < 1) {
//         searchDewormed.forEach((value) => {
//         searchPet.push(value);
//       });
//     }
//   }
//   if (searchSterilized.length > 0) {
//     if (searchPet.length < 1) {
//         searchSterilized.forEach((value) => {
//         searchPet.push(value);
//       });
//     }
//   }
  searchPet.length == 1 ? searchPet : [];
  console.log(searchPet);
  return searchPet;
}

/*KHAI BÁO SỰ KIỆN*/
//Sự kiện nút btnFind
btnFind.addEventListener("click", () => {
  let pet = {
    id: petID.value,
    petName: petName.value,
    type: petType.value,
    breed: petBreed.value,
    vaccinated: isVaccinated.checked,
    dewormed: isDewormed.checked,
    sterilized: isSterilized.checked,
  };
  if (
    pet.id == "" &&
    pet.petName == "" &&
    pet.type == "Select Type" &&
    pet.breed == "Select Breed" &&
    pet.vaccinated == false &&
    pet.dewormed == false &&
    pet.sterilized == false
  ) {
    RenderTable(arrPets);
  } else RenderTable(searchPet(pet));
});
