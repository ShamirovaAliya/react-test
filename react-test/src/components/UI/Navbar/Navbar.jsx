import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';

const Navbar = () => {
    const { setIsAuth } = useContext(AuthContext);

    /*При нажатии на кнопку "Выйти", необходимо эту запись из localStorage удалять*/
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth'); /*Удаление по ключу auth запись из localStorage*/
    };

    return (
        <div className='navbar'>
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className='navbar__links'>
                <Link to='/about'>О сайте</Link>
                <Link to='/posts'>Посты</Link>
            </div>
        </div>
    );
};

export default Navbar;