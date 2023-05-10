import http from "../http-common";

class CategorysDetailService {
    //router.get("/manufactors", ManufactorsController.getAll);
    getAll() {
        return http.get("/catgories_detail");
    }
}

export default new CategorysDetailService();