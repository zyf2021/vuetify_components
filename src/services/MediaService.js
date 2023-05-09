import http from "../http-common";

class ThemesNewsService {
  getAll() {
    return http.get("/media");
  }
  getAllByNewsId(newsId) {
    return http.get(`/media/all/${newsId}`);
  }
  get(id) {
    return http.get(`/media/${id}`);
  }

  create(data) {
    return http.post("/media", data);
  }

  update(data) {
    return http.put("/media", data);
  }

  delete(id) {
    return http.delete(`/media/${id}`);
  }

  deleteAll() {
    return http.delete(`/media`);
  }
}

export default new ThemesNewsService();