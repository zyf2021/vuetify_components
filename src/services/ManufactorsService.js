import http from "../http-common";

class ManufactorsService {
    //router.get("/manufactors", ManufactorsController.getAll);
    getAll() {
        return http.get("/manufactors");
    }
}

export default new ManufactorsService();