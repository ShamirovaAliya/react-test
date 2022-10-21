/*Работа с номерами страниц*/
export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

/*Функция, которая принимает общее кол-во страниц и на основании этого количества заполняет массив*/
export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }

    return result;
};