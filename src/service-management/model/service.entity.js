export class Service {
    constructor(
        id = 0,
        category_id = 0,
        company_id = 0,
        service_name = '',
        description = '',
        price = 0,
        duration = 0,
        rating = 0,
        sales = 0,
        created_at = new Date(),
        img = '',
    ) {
        this.id = id;
        this.category_id = category_id;
        this.company_id = company_id;
        this.service_name = service_name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.rating = rating;
        this.sales = sales;
        this.created_at = new Date(created_at);
        this.img = img;
    }
}
