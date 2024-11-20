import http from "../../shared/services/http-common.js";
import { ServiceApiService } from "../../service-management/services/service-api.service.js";
import {Appointment} from "../../appointment-management/model/appointment.entity.js";
export class ReviewApiService extends ServiceApiService {
    constructor() {
        super();
    }

    async getReviewByAppointmentId(appointmentId) {
        return http.get(`/reviews/appointment/${appointmentId}`);
    }

    async getReviewByCompanyId(companyId) {
        return http.get(`/reviews/company/${companyId}`);
    }

    async getReviewByUserId(userId) {
        return http.get(`/reviews/user/${userId}`);
    }
    async getReviewById(reviewId) {
        return http.get(`/reviews/${reviewId}`);
    }

    async deleteReview(reviewId) {
        return http.delete(`/reviews/${reviewId}`);
    }

    async createReview(reviewData) {
        return http.post('/reviews', reviewData);
    }
    async updateReview(reviewId, reviewData) {
        return http.put(`/reviews/${reviewId}`, reviewData);
    }
    getAppointmentById(appointmentId) {
        return http.get(`/appointments/${appointmentId}`);
    }
    getReviewByAppointmentId(appointmentId) {
        return http.get(`/reviews?appointmentId=${appointmentId}`);
    }
    getReviewsByCompanyId(companyId) {
        return http.get(`/reviews/company/${companyId}`);
    }
}