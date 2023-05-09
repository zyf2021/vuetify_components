import http from "../http-common";

class NewsService {
    upload() {
        return http.get("/upload");
    }
    getListFiles() {
        return http.get("/files");
    }
    download(name) {
        return http.get(`/files/${name}`);
    }
}

export default new NewsService();