import http from "../http-common";

class ClassesProblemService {
  getAll() {
    return http.get("/classes_problem");
  }
    
  get(id) {
    return http.get(`/classes_problem/${id}`);
  }

  create(data) {
    return http.post("/classes_problem", data);
  }

  update(data) {
    return http.put("/classes_problem", data);
  }

  delete(id) {
    return http.delete(`/classes_problem/${id}`);
  }

  deleteAll() {
    return http.delete(`/classes_problem`);
  }
}

export default new ClassesProblemService();