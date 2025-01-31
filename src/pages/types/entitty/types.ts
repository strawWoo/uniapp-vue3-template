export type ProductType = {
    typeName: string
    subTypes: SubType[]
}

export type SubType = {
    subTypeName: string
    url: string
}

export type TypeLabelTop = {
    index: string
    top: number
}