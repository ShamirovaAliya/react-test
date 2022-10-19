import React from 'react';
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PostList = ({ posts, title, remove }) => {
    /*Условие проверить, что массив пустой*/
    if (!posts.length) {
        /*Возвращаем нужный jsx, в нашем случае это заголовок Посты не найдены!*/
        return (
            <h1 style={{ textAlign: 'center' }}>
                Пусто
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                {title}
            </h1>
            <TransitionGroup>
                {/*map - функция позволяет получить новый массив преобразовав при этом все элементы*/}
                {/*Обращение к списку post и мы вызываем функцию map, где каждый объект поста преобразовывается в реакт элемент преобразовывание jsx*/}
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        {/*Для каждого поста в массиве мы отрисовываем PostItem и передаём туда объект*/}
                        <PostItem remove={remove} number={index + 1} post={post} key={post.id} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;