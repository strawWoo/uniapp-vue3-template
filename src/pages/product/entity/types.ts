export type ShopInfo = {
    id: number;
    logoUrl: string;
    name: string;
    isSelf: boolean;
    evaluateScore: number;
    follows: number;
    productLists: ProductInfo[];
}

export type ProductInfo = {
    coverImageUrl: string;
    price: number;
}