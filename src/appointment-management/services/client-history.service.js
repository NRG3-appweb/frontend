import http from "../../shared/services/http-common.js";
import { ServiceApiService } from "../../service-management/services/service-api.service.js";

export class HistoryApiService {
    constructor() {
        this.serviceApiService = new ServiceApiService();
    }

    async getAppointments() {
        try {
            const response = await http.get(`/appointments/`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching appointments:', error);
            throw error;
        }
    }

    async getServiceById(serviceId) {
        try {
            const response = await http.get(`/services/${serviceId}`);
            console.log('API Response for Service:', response.data); // Debugging log
            return response.data;
        } catch (error) {
            console.error('Error fetching service:', error);
            throw error;
        }
    }

    async getCompanyById(companyId) {
        try {
            const response = await http.get(`/companies/${companyId}`);
            console.log('API Response for Company:', response.data); // Debugging log
            return response.data;
        } catch (error) {
            console.error('Error fetching company:', error);
            throw error;
        }
    }

    async getReviewByAppointmentId(appointmentId) {
        try {
            const response = await http.get(`/reviews?appointmentId=${appointmentId}`);
            console.log('API Response for Review:', response.data); // Debugging log
            return response.data;
        } catch (error) {
            console.error('Error fetching review:', error);
            throw error;
        }
    }
}