import http from "../../shared/services/http-common.js";

export class AppointmentApiService {

    /**
     * Fetch all appointments
     * @returns {Promise<Array>} Array of appointment objects
     */
    getAppointmentsByUserId(userId) {
        return http.get(`/appointments/user/${userId}`)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching appointments:", error);
                return [];
            });
    }

    getAppointmentsByCompanyId(companyId) {
        return http.get(`/companies/${companyId}/appointments`)
    }

    /**
     * Cancel an appointment by appointment ID
     * @param {number} appointmentId
     * @returns {Promise<void>} Resolves if the appointment is successfully canceled
     */
    cancelAppointment(appointmentId) {
        return http.delete(`/appointments/${appointmentId}`)
            .then(() => {
                console.log(`Appointment with id ${appointmentId} canceled successfully.`);
            })
            .catch(error => {
                console.error(`Error canceling appointment with id ${appointmentId}:`, error);
                throw error;
            });
    }

    getAppointmentById(appointmentId) {
        return http.get(`/appointments/${appointmentId}`);
    }
}