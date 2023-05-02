import http from "../http-common";

class CategoriesWarrantyService {
  getAll() {
    return http.get("/categories_warranty");
  }

  get(id) {
    return http.get(`/categories_warranty/${id}`);
  }

  create(data) {
    return http.post("/categories_warranty", data);
  }

  update(data) {
    return http.put("/categories_warranty", data);
  }

  delete(id) {
    return http.delete(`/categories_warranty/${id}`);
  }

  deleteAll() {
    return http.delete(`/categories_warranty`);
  }
}

export default new CategoriesWarrantyService();