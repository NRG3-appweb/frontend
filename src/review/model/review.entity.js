export class Review {
    constructor(
        id = 0,
        userId = 0,
        appointment = {
            serviceName: '',
            companyName: '',
            reservationStartTime: '',
            userId: 0
        },
        rating = 0,
        comments = '',
        imageUrl = ''
    ) {
        this.id = id;
        this.userId = userId;
        this.appointment = appointment;
        this.rating = rating;
        this.comments = comments;
        this.imageUrl = imageUrl;
    }
}