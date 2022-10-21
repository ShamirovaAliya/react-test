import { useEffect, useState } from 'react';
import './styles/App.css';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';

/*Реализация роутинга React router. Компонент всегда должен возвращать некоторые jsx, хотя бы с одним элементом*/
function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, []);

    return (
        /*Для того, чтобы реализовать роутинг необходимо всё приложение обернуть в компонент BrowserRouter. Он будет отслеживать изменение путей и перерисовывать компоненты*/
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
        }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}

export default App;