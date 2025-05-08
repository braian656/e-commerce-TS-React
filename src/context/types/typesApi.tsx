
// TS Necesita saber que tipos de datos se van a llamar

import React from "react";

// no tengo ni puta idea que estoy haciendo
export interface InfoApi  {

    productId: number;
    productKey: number;
    productImage: string;
    productTitle: string;
    productPrice: number;
    productCategory: string;
    productDescription: string;
    productRatingRate: number;  

}

export interface ActualUser{
    name: string | null;
    surname: string | null;
    email: string | null;
    password: string | null;
    password_repeat: string | null;
} 
export interface UserFromFirebase {
    name: string | null;
    surname: string | null;
    email: string | null;
    password: string | null;
    password_repeat: string | null;
}
export type ValidationErrors = {
    // firma de indice, paso claves dinamicamente
    [key:string] : string;
};



export interface ActualProduct {
    index : number;
    image : string;
    product : string;
    descr : string;
    total : number;
    productCategory : string;
    rating: number;
}
// export interface StateActualProduct{
//     userState : ActualProduct | null,
// }


export type ProductsWhishList = {
    id:number;
    image: string;
    product: string;
    description: string;
    price: number;
    quantity: number;
    color: string;
  }

export interface PurchasedProduct {
    producto : string;
    price: number;
    color: string;
    cantidad: number;

}
// Todos los datos que se van a usar en los componentes

// en mi types describo los tipos de datos que voy a usar, y que funciones


export interface CurrentInfo {
   
    productData: InfoApi[]; 
    setProductData: React.Dispatch<React.SetStateAction<InfoApi[]>>;

    actualProduct : ActualProduct;
    setActualProduct: React.Dispatch<React.SetStateAction<ActualProduct>>;
    pagProduct : (product : ActualProduct)=> void;

    totalPrice: number[];
    setTotalPrice: React.Dispatch<React.SetStateAction<number[]>>;
    renderTotalPrice: number; 

    openPagProduct : boolean;
    setOpenPagProduct : React.Dispatch<React.SetStateAction<boolean>>;

    totalProducts: number;

    productsPerPage : number;
    setProductsPerPage : React.Dispatch<React.SetStateAction<number>>;

    currentPage : number;
    setCurrentPage : React.Dispatch<React.SetStateAction<number>>;

    lastIndex : number;
    firstIndex : number;

    categories : string | undefined;
    setCategories: React.Dispatch<React.SetStateAction<string | undefined>>;

    someErr : string ; /*| undefined*/
    setSomeErr: React.Dispatch<React.SetStateAction<string>>;


    userSelectedCategory: string[];
    setUserSelectedCategory : React.Dispatch<React.SetStateAction<string[]>>;
    

    purchasedProducts : PurchasedProduct[];
    setPurchasedProducts: React.Dispatch<React.SetStateAction<PurchasedProduct[]>>;

    picUser : string;
    setPicUser : React.Dispatch<React.SetStateAction<string>>;

    selectingPrice: number | null; 
    setSelectingPrice: React.Dispatch<React.SetStateAction<number | null>>;

    activeItemId: number | null;
    setActiveItemId: React.Dispatch<React.SetStateAction<number | null>>;

    actualUser: ActualUser | null;
    setActualUser: React.Dispatch<React.SetStateAction<ActualUser | null>>;

    userFromDB : UserFromFirebase | null;
    setUserFromDB : React.Dispatch<React.SetStateAction<UserFromFirebase | null>>

   
}


// el estado totalPrice es un array
// se actualiza cuando se remueve un item en el componente header