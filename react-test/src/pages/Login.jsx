import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context'

/*Нек-рые маршруты будут доступны только авториз-ным пользователям, а некоторые маршруты только тем пользователем, которые впервые зашли в приложение*/
const Login = () => {
    const { setIsAuth } = useContext(AuthContext);

    const login = event => {
        event.preventDefault(); /*Чтобы страница не обновлялась*/
        setIsAuth(true);
        localStorage.setItem('auth', 'true'); /*В момент авториз., в момент Login помимо изменения состояния также что-то сохранять в localStorage. Подключение auth, сохранение строк. В localStorage можно сохранять только строки*/
    };

    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput type='text' placeholder='Введите логин' />
                <MyInput type='password' placeholder='Введите пароль' />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    )
}

export default Login;