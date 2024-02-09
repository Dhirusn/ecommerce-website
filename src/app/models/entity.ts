export enum Entity {
}

export class ItemModel {
    creationAt :any;
    id: any;
    images: any;
    updatedAt : any;
    price : any
    description:any;
    title: any;
    category!: Category;
    rating : any;
}

export class Category{
    creationAt :any;
    id: any;
    image: any;
    name : any;
    updatedAt : any;
}