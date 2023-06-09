export const IsOutOfBounds = function(index: number, array: any[], offset: number = 0) {
    return (index -offset) < 0 || (index+offset) >= array.length
}

export const IsOutOfUpperBounds = function(index: number, array: any[], offset: number = 0) {
    return (index+offset) >= array.length
}

export const IsOutOfLowerBounds = function(index: number, array: any[], offset: number = 0) {
    return (index-offset) < 0
}