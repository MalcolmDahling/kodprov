export interface IEmployees{

    employees: [{
        developer:{
            availability:number;
            category:string;
            experienceAmount:number;
            id:string;
            office:{
                city:string;
            }
            price:number;
            title:string;
        }
    }]
}
