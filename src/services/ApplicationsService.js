import http from "../http-common";

class ApplicationsService {
  getCountStatusApplic() {
    return http.get(`/applications/count/statuses_applic_1`);
  }
  getCountUsers() {
    return http.get(`/applications/count/users`);
  }
  getCountDetails() {
    return http.get(`/applications/count/details`);
  }
  //getCountApplicationsByClasses
  getCountApplicationsByClasses() {
    return http.get(`/applications/count/applic/classes`);
  }
  getCountApplicationsByMasters() {
    return http.get(`/applications/count/applic/masters`);
  }
  getCountApplicationsByMonth() {
    return http.get(`/applications/count/applic`);
  }
  //
  getAllForCleintById(id){
    return http.get(`/applications/clients/${id}`);
  }
  getAllForMasterById(id){
    return http.get(`/applications/master/${id}`);
  }
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