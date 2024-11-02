import http from "../../shared/services/http-common.js";

export class CompanyDetailApiService{
    /**
     * Get all companies
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getCompanies(){
        return http.get('/companies');
    }

}