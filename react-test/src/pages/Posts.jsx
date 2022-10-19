import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';

function Posts() {
    const [posts, setPosts] = useState([])
    /*Созаём двустороннее связывание, для этого создаём новое состояние selectedSort, с помощью useState инициализируем и по умолчанию это будет пустая строка*/
    const [filter, setFilter] = useState({ sort: '', query: '' })
    /*Состояние, которое будет отвечать за то, что видно модальное окно или нет и чтобы мы этим могли динамически управлять. Например показывать модальное окно, при нажатии на кнопку*/
    const [modal, setModal] = useState(false);
    /*Состояник, в котором мы будем помещать общее количество постов*/
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data) /*Вызываем функцию setPosts и передаём туда все 100 постов, который  вернул нам сервер*/
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page])

    /*Создание постов*/
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false) /*Закрытие модального окна*/
    }

    /*Получаем post из дочернего компонента*/
    /*Удаление постов*/
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id)) /*Проверка id, если id какого-то элемента из массива равен тому id, который мы передали постов, то тогда просто этот элемент из массива удаляем*/
    }

    /*Функция, которая будет изменять номер страницы и с изменённым номером страницы сразу подгружать новую порцию данных*/
    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }

    return (
        <div className="App">
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {/*Проверка над списком постов, если в postError что-то находится, то тогда будем показывать заголовок h1 и выводить сообщение об ошибке*/}
            {postError &&
                <h1>Произошла ошибка &{postError}</h1>
            }
            {/*Проверка, если условие равняется true, то будем показывать некоторую крутилку, в обратном случае будем показывать список постов*/}
            {isPostsLoading
                ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }} ><Loader /></div>
                : <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про JS" />
            }
            {/*Передача номер страницы, функция которой этот номер изменяет, эта функция ChangePage и общее кол-во страниц, это состояние totalPages*/}
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div >
    );
}

export default Posts;

//React хуки
//useState() - предназначен для управления состоянием
//useEffect(callback, deps) - хук можно использовать столько раз в компоненте сколько необходимо. Один хук следит за одними данными, другой хук следит за изменениями других данных, третий хук отрабатывает первичные отрисовки. Он также принимает некторый callback и некоторый массив зависимостей.
  //Когда массив зависимостей пустой, callback который передаётся в useEffect отработает лишь единожды, когда компонент был вмонтирован, таким образом можно отследить эту стадию монтирования и выполнить нужные дейсвия
//useRef()
//useMemo(callback, deps) - первым параметром этот хук принимает некоторый callback, некоторую функцию обратного вызова, а вторым параметром принимает массив зависимостей.
   //callback должен возвращать результат каких-то вычислений, например от сортированный массив или же отфильтрованный массив, какие-то математические операции, вообщем результат каких-то вычислений
//useCallback()
//useContext()