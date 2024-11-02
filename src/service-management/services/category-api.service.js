import http from "../../shared/services/http-common.js";

export class CategoryApiService {

    /**
     * Get all categories
     * @returns {Promise<axios.AxiosResponse<any>>}
     */

    getCategories() {
        return http.get('/categories');
    }

}
