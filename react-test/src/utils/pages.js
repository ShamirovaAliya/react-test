/*–абота с номерами страниц*/
export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

/*‘ункци€, котора€ принимает общее кол-во страниц и на основании этого количества заполн€ет массив*/
export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result;
}