import http from "../http-common";

class NewsService {
  getAll() {
    return http.get("/news");
  }

  getThree() {
    return http.get("/news/three");
  }

  getNewsByThemeId(id) {
    return http.get(`/news/themes/${id}`);
  }

  get(id) {
    return http.get(`/news/${id}`);
  }

  create(data) {
    return http.post("/news", data);
  }

  update(data) {
    return http.put("/news", data);
  }

  delete(id) {
    return http.delete(`/news/${id}`);
  }

  deleteAll() {
    return http.delete(`/news`);
  }
}

export default new NewsService();