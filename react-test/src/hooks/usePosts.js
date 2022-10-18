import { useMemo } from 'react';

/*Функция, которая параметрами будет принимать посты и метод сортировки*/
export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        /* Проверка если selectedSort существует, если там не пустая строка, то мы будем возвращать отсортированный массив, в обратном случае будем возвращать обычный массив постов(posts)*/
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;
    }, [sort, posts])

    return sortedPosts; /*хук, который сортирует, по итогу сортированный массив должен вернуть*/ 
}

/*Хук usePosts, который будет возвращать уже и отфлитрованные и отсортированный массив. Аргументами он принимает посты, метод сортировки и поисковую строку (posts, sort, query)*/
export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort); /*Получение массива от отсортированных постов*/

    const sortedAndSearchPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase())) /*Метод toLowerCase() преобразует все символы в данной строки в нижний регистр, используя правила языкового стандарта*/
    }, [query, sortedPosts])

    return sortedAndSearchPosts; /*Из этой функции происходит возвращение массива и отсортированных и отфлитрованных постов*/
}