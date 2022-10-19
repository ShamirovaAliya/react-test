import axios from 'axios';

export default class PostService {
    /*Функция, которая будет возвращать список постов. Также будет принимать лимит, по умолчанию он будет равен 10 и номер страницы, по умолчанию 1*/
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        }) /*Создание переменной, куда будет помещён результат выполнения запроса. Функция асинхронная, для того чтобы использовать await используем axios, get запрос для получения данных*/
        return response;
    }
}