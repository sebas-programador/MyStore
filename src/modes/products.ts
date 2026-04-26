import { IProduct } from "@/interfaces/products"

export const MProduct = <IProduct> {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
         rate: 0,
        count: 0
    }
}