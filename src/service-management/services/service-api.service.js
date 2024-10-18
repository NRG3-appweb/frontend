import http from "../../shared/services/http-common.js";

export class ServiceApiService {


    /**
     * Get a single category by ID
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */

    getCategory(id) {
        return http.get(`/categories/${id}`);
    }

    /**
     * Get all companies
     * @returns {Promise<axios.AxiosResponse<any>>}
     */

    getCompanies() {
        return http.get('/companies');
    }

    /**
     * Get a single company by ID
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */

    getCompany(id) {
        return http.get(`/companies/${id}`);
    }


    /**
     * Get all services
     * @returns {Promise<axios.AxiosResponse<any>>}
     */

    getServices() {
        return http.get('/services');
    }


    /**
     * Get a single service by ID
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */

    getServiceById(id) {
        return http.get(`/services/${id}`);
    }

    /**
     * Create a new service
     * @param service
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    createService(service) {
        return http.post('/services', service);
    }
}