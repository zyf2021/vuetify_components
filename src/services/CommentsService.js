import http from "../http-common";

class ThemesNewsService {
  getAll(newsId) {
    return http.get(`/comments/all/${newsId}`);
  }

  get(id) {
    return http.get(`/comments/${id}`);
  }

  create(data) {
    return http.post("/comments", data);
  }

  update(data) {
    return http.put("/comments", data);
  }

  delete(id) {
    return http.delete(`/comments/${id}`);
  }

  deleteAll() {
    return http.delete(`/comments`);
  }
}

export default new ThemesNewsService();