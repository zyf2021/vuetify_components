import http from "../http-common";

class StatusesApplicService {
  getAll() {
    return http.get("/statuses_applic");
  }

  get(id) {
    return http.get(`/statuses_applic/${id}`);
  }

  create(data) {
    return http.post("/statuses_applic", data);
  }

  update(data) {
    return http.put("/statuses_applic", data);
  }

  delete(id) {
    return http.delete(`/statuses_applic/${id}`);
  }

  deleteAll() {
    return http.delete(`/statuses_applic`);
  }
}

export default new StatusesApplicService();