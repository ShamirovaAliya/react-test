import React, { useEffect, useState, useRef } from 'react';
import PostService from '../API/PostService';
import ClassCounter from '../components/ClassCounter';
import Counter from '../components/Counter';
import Pagitaion from '../components/Pagination';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import { useFetching } from '../hooks/useFetching';
import { userObserver } from '../hooks/useObserver';
import { usePosts } from '../hooks/usePosts';
import '../styles/App.css';
import { getPageCount } from '../utils/pages';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

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
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]); /*Вызываем функцию setPosts и передаём туда все 100 постов, который  вернул нам сервер*/
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);

    /*Создание постов*/
    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false) /*Закрытие модального окна*/
    };

    /*Получаем post из дочернего компонента*/
    /*Удаление постов*/
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id)); /*Проверка id, если id какого-то элемента из массива равен тому id, который мы передали постов, то тогда просто этот элемент из массива удаляем*/
    };

    /*Функция, которая будет изменять номер страницы и с изменённым номером страницы сразу подгружать новую порцию данных*/
    const changePage = (page) => {
        setPage(page);
    };

    return (
        <div className="App">
            <Counter init={5} />
            <ClassCounter />

            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать элемент
            </MyButton>
            <MyModal visible={modal} setVisible={setModal} >
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Объем страницы'
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 15, name: '15' },
                    { value: 20, name: '20' },
                    { value: -1, name: 'Все посты' },
                ]}
            />

            {postError &&
                <h1>Ошибка: {postError}</h1>
            }

            <PostList remove={removePost} posts={sortedAndSearchPosts} title='Список постов' />
            <div ref={lastElement}></div>
            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                    <Loader />
                </div>}
            {/*Передача номер страницы, функция которой этот номер изменяет, эта функция ChangePage и общее кол-во страниц, это состояние totalPages*/}
            <Pagitaion
                totalPages={totalPages}
                page={page}
                changePage={changePage} />
        </div>
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
//useContext() - можно создать некоторое глобальное хранилище из любого компонента к этому глобальному хранилище обращаться, при этом избегая этой передачи родиителя к ребёнку
/*useNavigate - возвращает функцию, которая позволяет программно перемещаться*/