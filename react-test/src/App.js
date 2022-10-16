import React, { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'JavaScript', body: 'Мультипарадигменный язык программирования' },
        { id: 2, title: 'CSS', body: 'Язык разметки описания внешнего вида документа' },
        { id: 3, title: 'HTML', body: 'Язык гипертекстовой разметки документов для просмотра веб-страниц в браузере' },
    ])
    /*Созаём двустороннее связывание, для этого создаём новое состояние selectedSort, с помощью useState инициализируем и по умолчанию это будет пустая строка*/
    const [filter, setFilter] = useState({ sort: '', query: '' })
    /*Состояние, которое будет отвечать за то, что видно модальное окно или нет и чтобы мы этим могли динамически управлять. Например показывать модальное окно, при нажатии на кнопку*/
    const [modal, setModal] = useState(false);

    const sortedPosts = useMemo(() => {
        console.log('ОТРАБОТАЛА ФУНКЦИЯ СОРТЕД ПОСТО')
        /* Проверка если selectedSort существует, если там не пустая строка, то мы будем возвращать отсортированный массив, в обратном случае будем возвращать обычный массив постов(posts)*/
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes([filter.query])) /*Метод toLowerCase() преобразует все символы в данной строки в нижний регистр, используя правила языкового стандарта*/
    }, [filter.query, sortedPosts])

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

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
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
                <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про JS" />
        </div>
    );
}

export default App;

//React хуки
//useState() - предназначен для управления состоянием
//useEffect()
//useRef()
//useMemo(callback, deps) - первым параметром этот хук принимает некоторый callback, некоторую функцию обратного вызова, а вторым параметром принимает массив зависимостей.
   //callback должен возвращать результат каких-то вычислений, например от сортированный массив или же отфильтрованный массив, какие-то математические операции, вообщем результат каких-то вычислений
//useCallback()
//useContext()