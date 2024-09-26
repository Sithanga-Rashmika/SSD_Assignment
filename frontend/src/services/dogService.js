import { http } from "../http";

const serviceUrl = "dog/"

export const viewDogs = async () => {
    return await http.get(serviceUrl);
}

export const dogsList = async () => {
  return await http.get(serviceUrl);
}

export const addNewDog = async (dog) => {
    return await http.post(serviceUrl, dog)
    .then(() => {
        alert("Dog added");
        window.location.replace('/viewDogs');
      })
      .catch((err) => {
        alert(err);
      });
}
export const viewOneDog = async (id) => {
  return await http.get(`${serviceUrl}${id}`);
}
export const updateDoggy = async (id, dog) => {
  return await http.put(`${serviceUrl}${ id }`, dog);
}
export const deleteDog = async (id) => {
  return await http.delete(`${serviceUrl}${id}`);
}