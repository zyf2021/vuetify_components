import http from "../http-common";

class ThemesNewsService {
  getAll() {
    return http.get("/themes");
  }

  get(id) {
    return http.get(`/themes/${id}`);
  }

  create(data) {
    return http.post("/themes", data);
  }

  update(data) {
    return http.put("/themes", data);
  }

  delete(id) {
    return http.delete(`/themes/${id}`);
  }

  deleteAll() {
    return http.delete(`/themes`);
  }
}

export default new ThemesNewsService();