import http from "../http-common";

class UsersService {

  getAllManagers() {
    return http.get("/users/managers");
  }

  getAllMasters() {
    return http.get("/users/masters");
  }

  getAllClients() {
    return http.get("/users/clients");
  }



  get(id) {
    return http.get(`/users/${id}`);
  }

  getAll() {
    return http.get("/users");
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put("/users", data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }
}

export default new UsersService();