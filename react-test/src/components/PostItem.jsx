import React from 'react';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router-dom';

const PostItem = (props) => {
    const navigate = useNavigate() /*Переходы на другие страницы можно осуществлять и без компонента Link, с помощью специального объекта Navigate*/
    
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate('/posts/' + props.post.id)}>
                    Открыть
                </MyButton>
                <MyButton onClick={() => props.remove(props.post)}> {/*При нажатии на кнопку мы её могли  вызвать*/}
                    Удалить
                </MyButton>
            </div>
        </div>
    );
}

export default PostItem;