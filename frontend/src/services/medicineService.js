import { http } from "../http";

const serviceUrl = "medicine/"

export const getMedicine = async () => {
    return await http.get(serviceUrl);
}

export const getMedicineById = async (id) => {
  return await http.get(`${serviceUrl}${id}`);
}

export const searchMedicine =  async (key) => {
  return await http.get(`${serviceUrl}search/${key}`)
}

export const createMedicine = async (medicine) => {
    return await http.post(serviceUrl, medicine)
    .then(() => {
        alert("Medicine added");
        window.location.replace('/medicines');
      })
      .catch((err) => {
        alert(err);
      });
}

export const deleteMedicine = async (id) => {
  return await http.delete(`${serviceUrl}${id}`);
}

export const updateMedicine = async (id, medicine) => {
  return await http.put(`${serviceUrl}${ id }`, medicine);
}