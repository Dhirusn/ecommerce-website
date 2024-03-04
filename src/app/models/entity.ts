export enum Entity {
}

export interface ItemModel {
    creationAt :any;
    id: any;
    images: any;
    updatedAt : any;
    price : any
    description:any;
    title: any;
    category: Category;
    rating : any;
}

export interface Category{
    creationAt :any;
    id: any;
    image: any;
    name : any;
    updatedAt : any;
}