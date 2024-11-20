export class Service {
    constructor(
        id = 0,
        company = { id: 0, name: '' },
        category = { id: 0, name: '' },
        name = '',
        description = '',
        price = 0,
        duration = 0,
        rating = 0,
        sales = 0,
        imgUrl = '',
    ) {
        this.id = id;
        this.company = company;
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.rating = rating;
        this.sales = sales;
        this.imgUrl = imgUrl;
    }
}
