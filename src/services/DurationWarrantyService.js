import http from "../http-common";

class DurationWarrantyService {
  getAll() {
    return http.get("/duration_warranty");
  }

  get(id) {
    return http.get(`/duration_warranty/${id}`);
  }

  create(data) {
    return http.post("/duration_warranty", data);
  }

  update(data) {
    return http.put("/duration_warranty", data);
  }

  delete(id) {
    return http.delete(`/duration_warranty/${id}`);
  }

  deleteAll() {
    return http.delete(`/duration_warranty`);
  }
}

export default new DurationWarrantyService();