export interface product
{
    length: any;
    forEach(arg0: (product: product) => void): unknown;
    id:any,
    productName:string,
    productPrice:number,
    productColor:string,
    productCategory:string,
    productDescription:string,
    productImage:string,
    quantity:undefined |Number,
    productId:undefined | number
}

export interface cart
{
    id:any,
    userId:number;
    productID:number;
    productName:string,
    productPrice:number,
    productColor:string,
    productCategory:string,
    productDescription:string,
    productImage:string,
    quantity:undefined |Number
}

export interface priceSummary
{
    price:number,
    discount:number,
    tax:number,
    deliveryCharge:number
    total:number
}

export interface order
{
    firstName:string,
    lastName:string,
    email:string,
    address:string,
    mobileNumber:string
    totalPrice:number,
    userId:number
    id:number |undefined
}