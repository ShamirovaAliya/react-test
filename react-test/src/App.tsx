import React, { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import MyModal from './components/UI/MyModal/MyModal';
import PostFilter from './components/PostFilter';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'JavaScript', body: 'aa' },
        { id: 2, title: 'CSS', body: 'bb' },
        { id: 3, title: 'HTML', body: 'cc' },
    ])
    /*Созаём двустороннее связывание, для этого создаём новое состояние selectedSort, с помощью useState инициализируем и по умолчанию это будет пустая строка*/
    const [filter, setFilter] = useState({sort: '', query: ''})

    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    /*Создание постов*/
    const createPost = (newPost: { id: number; title: string; body: string; }) => {
        setPosts([...posts, newPost])
    }

    /*Получаем post из дочернего компонента*/
    /*Удаление постов*/
    const removePost = (post: { id: number; }) => {
        setPosts(posts.filter(p => p.id !== post.id)) /*Проверка id, если id какого-то элемента из массива равен тому id, который мы передали постов, то тогда просто этот элемент из массива удаляем*/
    }

    return (
        <div className="App">
            <MyModal>
                asfkbbf
            </MyModal>
            <PostForm create={createPost} />
            <hr style={{ margin: '15px 0'}} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={posts} title="Посты про JS" />
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