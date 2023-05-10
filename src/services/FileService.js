import http from "../http-common";

class FileService {
    upload() {
        return http.get("/upload");
    }
    //router.get("/files/main/:name", FileController.getImageForMain);
    getImageForMain(name) {
        return http.get(`/files/main/${name}`);
    }
    //router.get("/files/main/:name", FileController.getImageForMain);
    getListFilesForMain() {
        return http.get(`/files/main`);
    }
    getListFiles() {
        return http.get("/files");
    }
    
    download(name) {
        return http.get(`/files/${name}`);
    }

}

export default new FileService();