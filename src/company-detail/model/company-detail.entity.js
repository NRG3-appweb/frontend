export class CompanyDetail{
    constructor(
        id=0,
        name='',
        img='',
        ruc='',
        email='',
        website='',
        description='',
        created_at= new Date(),
    )
    {
        this.id = id;
        this.name = name;
        this.img = img;
        this.ruc = ruc;
        this.email = email;
        this.website = website;
        this.description = description;
        this.created_at = new Date(created_at);
    }
}
