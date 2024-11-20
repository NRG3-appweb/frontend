import http from "../../shared/services/http-common.js";

    export class ServiceApiService {
        /**
         * Get all companies
         * @returns {Promise<axios.AxiosResponse<any>>}
         */
        getCompanies() {
            return http.get('/companies');
        }
        /**
         * Get all services
         * @returns {Promise<axios.AxiosResponse<any>>}
         */
        getServices() {
            return http.get('/services');
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
         * Get all services by id
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
         * Create a new services
         * @param service
         * @returns {Promise<axios.AxiosResponse<any>>}
         **/
        createService(service) {
            return http.post('/services', service);
        }

        /**
         * Delete a new services
         * @param serviceId
         * @returns {Promise<axios.AxiosResponse<any>>}
         * */
        deleteService(serviceId) {
            return http.delete(`/services/${serviceId}`);
        }

        /**
        * Update a services
         * @param serviceId
         * @param service
         * @returns {Promise<axios.AxiosResponse<any>>}
        * */
        updateServiceById(serviceId, service) {
            return http.put(`/services/${serviceId}`, service);
        }
    }