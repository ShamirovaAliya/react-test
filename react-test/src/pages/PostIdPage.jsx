import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

/*Компонент, страница на которую можно будет перейти при нажатии на кнопку "Открыть"*/
const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    /*Для отправки запросов сделан уже переиспользованный хук, который называется useFetching. Он возвращает массив, где первый эл-нт это нек-ая функция, второй эл-нт это индикатор закгрузки и третий эл-нт жто ошибка. Параметром этот хук принимает callback, кот-ый и будет возвращён в виде обёртки первым эл-ом этого массива*/
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data);
    });
    /*Запрос на получение комментариев*/
    const [fetchComments, commentsIsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    });
    /*Хук, где можно на первую отрисовку компонента получать данные с сервера*/
    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, []);

    return (
        <div>
            <h1>Вы открыли страницу поста c ID = {params.id}</h1>
            {isLoading
                ? <Loader />
                : <div>{post.id}. {post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {commentsIsLoading
                ? <Loader />
                : <div>
                    {comments.map(comment =>
                        <div key={comment.id} style={{ marginTop: 15 }}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;