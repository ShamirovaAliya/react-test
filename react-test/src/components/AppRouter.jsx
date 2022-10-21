import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/UI/Navbar/Navbar';
import { AuthContext } from '../context';
import Login from '../pages/Login';
import Posts from '../pages/Posts';
import { privateRoutes, publicRoutes } from '../router';
import Loader from './UI/Loader/Loader';

/*AppRouter хранит в себе маршруты к страницам*/
const AppRouter = () => {
    /*Доступ, чтобы неавтор-ные пользователи не могли видеть список постов. Это делается след. обр.: надо храненить информацию о том автор-ан пользователь или нет*/
    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <Navbar />
            {isAuth
                ?
                <Routes>
                    {privateRoutes.map(route =>
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={route.path}
                            element={route.component}
                        />
                    )}
                    <Route path='*' element={<Posts />} />
                </Routes>
                :
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={route.path}
                            element={route.component}
                        />
                    )}
                    <Route path='*' element={<Login />} />
                </Routes>
            }
        </BrowserRouter>
    );
};

export default AppRouter;