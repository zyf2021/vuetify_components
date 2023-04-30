import http from "../http-common";

class ApplicationsService {

  getMastersForManager(id) {
    return http.get(`/applications/managers/${id}`);
  }

  getAll() {
    return http.get("/applications");
  }

  get(id) {
    return http.get(`/applications/${id}`);
  }

  create(data) {
    return http.post("/applications", data);
  }

  update(data) {
    return http.put("/applications", data);
  }

  delete(id) {
    return http.delete(`/applications/${id}`);
  }

  deleteAll() {
    return http.delete(`/applications`);
  }
}

export default new ApplicationsService();