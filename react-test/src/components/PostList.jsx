import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, title, remove }) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
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
            {posts.map((post, index) =>
                <PostItem remove={remove} number={index + 1} post={post} key={post.id} /> /*Для каждого поста в массиве мы отрисовываем PostItem и передаём туда объект*/
            )}
        </div>
    );
};

export default PostList;