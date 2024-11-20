
export class Appointment {
    constructor(
        id = 0,
        user = { id: 0, firstName: '', lastName: '', dni: '' },
        service = { id: 0, serviceName: '', price: 0 },
        company = { id: 0, name: '' },
        reservationDate = '',
        status = '',
        date = '',
        time = '',
        requirements = ''
    ) {
        this.id = id;
        this.user = user;
        this.service = service;
        this.company = company;
        this.reservationDate = reservationDate;
        this.status = status;
        this.date = date;
        this.time = time;
        this.requirements = requirements;
    }
}