import React from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';

/*Реализация роутинга React router. Компонент всегда должен возвращать некоторые jsx, хотя бы с одним элементом*/
function App() {
    return (
        /*Для того, чтобы реализовать роутинг необходимо всё приложение обернуть в компонент BrowserRouter. Он будет отслеживать изменение путей и перерисовывать компоненты*/
        <BrowserRouter>
            
        </BrowserRouter>
    )
}

export default App;