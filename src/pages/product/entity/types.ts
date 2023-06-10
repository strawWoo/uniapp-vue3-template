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
    id: number;
    coverImageUrl: string;
    price: number;
}

export type SpecifyStore = {
    id: number;
    name: string;
}