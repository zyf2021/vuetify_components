import http from "../http-common";


class FileService {
    uploadUserAvatar(file, data) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("id", data);
        return http.post("/upload/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        });
    }
    upload(file) {
        let formData = new FormData()
        formData.append("file", file)
        console.log(formData)
        return http.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        })
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