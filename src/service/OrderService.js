import axios from "axios";

const URL = "http://localhost:8181/api/order";

export class OrderService {
  checkout(order) {
    return axios.post(URL + "/save", order).then((res) => res.data);
  }
}
