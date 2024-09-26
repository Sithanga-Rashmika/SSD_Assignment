import { http } from "../http";

const serviceUrl = "sales/"

export const getSales = async () => {
    return await http.get(serviceUrl);
}

export const createSales = async (sales) => {
    return await http.post(serviceUrl, sales)
    .then(() => {
        alert("Sales record added");
        window.location.replace('/medicines');
      })
      .catch((err) => {
        alert(err);
      });
}