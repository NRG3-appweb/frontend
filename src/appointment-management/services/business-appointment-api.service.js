import http from "../../shared/services/http-common.js";

export class BusinessAppointmentApiService {

    /**
     * Fetch user details by user ID
     * @param {number} userId
     * @returns {Promise<Object|null>} User data or null if error occurs
     */
    getUserById(userId) {
        return http.get(`/users/${userId}`)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching user details:", error);
                return null;
            });
    }

    /**
     * Fetch company details by company ID
     * @param {number} companyId
     * @returns {Promise<Object|null>} Company data or null if error occurs
     */
    getCompanyById(companyId) {
        return http.get(`/companies/${companyId}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching company with id ${companyId}:`, error);
                return null;
            });
    }

}