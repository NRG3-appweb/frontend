
export class Appointment {
    constructor(
        id = 0,
        userId = 0,
        serviceId = 0,
        companyId = 0,
        reservationDate = '',
        status = '',
        date = '',
        time = '',
        requirements = ''
    ) {
        this.id = id;
        this.userId = userId;
        this.serviceId = serviceId;
        this.companyId = companyId;
        this.reservationDate = reservationDate;
        this.status = status;
        this.date = date;
        this.time = time;
        this.requirements = requirements;
    }
}