import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, title, remove }) => {

    /*Условие проверить, что массив пустой*/ 
    if (!posts.length) {
        return ( /*Возвращаем нужный jsx, в нашем случае это заголовок Посты не найдены!*/
            <h1 style={{ textAlign: 'center' }}>
                Посты не найдены!
            </h1>
        )
    }
    
    return (
        <div className="App">
            <h1 style={{ textAlign: 'center' }}>
                {title}
            </h1>
            {/*map - функция позволяет получить новый массив преобразовав при этом все элементы*/}
            {/*Обращение к списку post и мы вызываем функцию map, где каждый объект поста преобразовывается в реакт элемент преобразовывание jsx*/}
            {posts.map((post) =>
                <PostItem remove={remove} post={post} key={post.id} /> /*Для каждого поста в массиве мы отрисовываем PostItem и передаём туда объект*/
            )}
            {/*Функция обратного вызова remove={remove} пришлось опракинуть на два уровня сначала в PostList, затем в PostItem (в App.tsx*/}
        </div>
    );
};

export default PostList;