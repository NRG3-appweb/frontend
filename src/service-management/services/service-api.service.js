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
        getService(id) {
            return http.get(`/services/${id}`);
        }

        /**
         * Get all services by category
         * @param categoryId
         * @returns {Promise<axios.AxiosResponse<any>>}
         */
        getServicesByCategory(categoryId) {
            return http.get(`/services/${categoryId}`);
        }


        /**
         * Get all service by id
         * @param serviceId
         * @returns {Promise<axios.AxiosResponse<any>>}
         * */
        getServiceById(serviceId){
            return http.get(`/services/${serviceId}`);
        }

        /**
         * Get all services by company
         * @param companyId
         * @returns {Promise<axios.AxiosResponse<any>>}
         * */
        getServicesByCompanyId(companyId) {
            return http.get(`/services?company_id=${companyId}`);
        }

        /**
         * Create a new service
         * @param service
         * @returns {Promise<axios.AxiosResponse<any>>}
         **/
        createService(service) {
            return http.post('/services', service);
        }

        /**
         * Delete a new service
         * @param serviceId
         * @returns {Promise<axios.AxiosResponse<any>>}
         * */
        deleteService(serviceId) {
            return http.delete(`/services/${serviceId}`);
        }


        /**
        * Update a service
         * @param serviceId
         * @param service
         * @returns {Promise<axios.AxiosResponse<any>>}
        * */
        updateService(serviceId, service) {
            return http.put(`/services/${serviceId}`, service);
        }
    }