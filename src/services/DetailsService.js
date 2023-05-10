import http from "../http-common";

class DetailsNewsService {
    //router.get('/details/free', detailsNewsController.getAllFreeDetails)
    getAllFreeDetails() {
      return http.get("/details/free");
    }
    getAll() {
      return http.get("/details");
    }   
    get(id) {
      return http.get(`/details/${id}`);
    }   
    create(data) {
      return http.post("/details", data);
    }   
    update(data) {
      return http.put("/details", data);
    }   
    delete(id) {
      return http.delete(`/details/${id}`);
    }   
    deleteAll() {
      return http.delete(`/details`);
    }
}

export default new DetailsNewsService();
