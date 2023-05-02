import http from "../http-common";

class WarrantyNewsService {
  getAll() {
    return http.get("/warranty");
  }

  getForApplic(id) {
    return http.get(`/warranty/applic/${id}`);
  }

  get(id) {
    return http.get(`/warranty/${id}`);
  }

  create(data) {
    return http.post("/warranty", data);
  }

  update(data) {
    return http.put("/warranty", data);
  }

  delete(id) {
    return http.delete(`/warranty/${id}`);
  }

  deleteAll() {
    return http.delete(`/warranty`);
  }
}

export default new WarrantyNewsService();