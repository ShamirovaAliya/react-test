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
    /*����� ������������ ����������, ��� ����� ������ ����� ��������� selectedSort, � ������� useState �������������� � �� ��������� ��� ����� ������ ������*/
    const [filter, setFilter] = useState({ sort: '', query: '' })
    /*���������, ������� ����� �������� �� ��, ��� ����� ��������� ���� ��� ��� � ����� �� ���� ����� ����������� ���������. �������� ���������� ��������� ����, ��� ������� �� ������*/
    const [modal, setModal] = useState(false);
    /*���������, � ������� �� ����� �������� ����� ���������� ������*/
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data) /*�������� ������� setPosts � ������� ���� ��� 100 ������, �������  ������ ��� ������*/
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page])

    /*�������� ������*/
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false) /*�������� ���������� ����*/
    }

    /*�������� post �� ��������� ����������*/
    /*�������� ������*/
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id)) /*�������� id, ���� id ������-�� �������� �� ������� ����� ���� id, ������� �� �������� ������, �� ����� ������ ���� ������� �� ������� �������*/
    }

    /*�������, ������� ����� �������� ����� �������� � � ��������� ������� �������� ����� ���������� ����� ������ ������*/
    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }

    return (
        <div className="App">
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                ������� ������������
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {/*�������� ��� ������� ������, ���� � postError ���-�� ���������, �� ����� ����� ���������� ��������� h1 � �������� ��������� �� ������*/}
            {postError &&
                <h1>��������� ������ &{postError}</h1>
            }
            {/*��������, ���� ������� ��������� true, �� ����� ���������� ��������� ��������, � �������� ������ ����� ���������� ������ ������*/}
            {isPostsLoading
                ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }} ><Loader /></div>
                : <PostList remove={removePost} posts={sortedAndSearchPosts} title="����� ��� JS" />
            }
            {/*�������� ����� ��������, ������� ������� ���� ����� ��������, ��� ������� ChangePage � ����� ���-�� �������, ��� ��������� totalPages*/}
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div >
    );
}

export default Posts;

//React ����
//useState() - ������������ ��� ���������� ����������
//useEffect(callback, deps) - ��� ����� ������������ ������� ��� � ���������� ������� ����������. ���� ��� ������ �� ������ �������, ������ ��� ������ �� ����������� ������ ������, ������ ��� ������������ ��������� ���������. �� ����� ��������� �������� callback � ��������� ������ ������������.
  //����� ������ ������������ ������, callback ������� ��������� � useEffect ���������� ���� ��������, ����� ��������� ��� �����������, ����� ������� ����� ��������� ��� ������ ������������ � ��������� ������ �������
//useRef()
//useMemo(callback, deps) - ������ ���������� ���� ��� ��������� ��������� callback, ��������� ������� ��������� ������, � ������ ���������� ��������� ������ ������������.
   //callback ������ ���������� ��������� �����-�� ����������, �������� �� ������������� ������ ��� �� ��������������� ������, �����-�� �������������� ��������, ������� ��������� �����-�� ����������
//useCallback()
//useContext()