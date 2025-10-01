export enum Entity {
}

export interface ItemModel {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    categories: any[];          // can refine type if you know category structure
    productCategories: any[];
    brandId: string | null;
    brand: string | null;       // or an object if brand has details
    images: any[];              // array of image objects/urls
    attributes: any[];
    productTags: any[];
    reviews: any[];
    createdAt: string;          // ISO date string
    updatedAt: string;          // ISO date string
    isDeleted: boolean;
    rating: number | null;
}


export interface Category {
    creationAt: any;
    id: any;
    image: any;
    name: any;
    updatedAt: any;
}

export interface Review {
  user: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  images?: string[];
}