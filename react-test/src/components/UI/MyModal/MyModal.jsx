import React, { Children, useState } from 'react';
import cl from './MyModal.module.css';

const MyModal = ({ children, visible, setVisible }) => {

    /*Реализация механих, которая будет скрывать или показывать это модальное окно. Сам компонент MyModal не может регулировать видимость или невидимость, этим будет управлять родительский компонент, в котором MyModal используется. Пропсы будут visible, который будет отвечать за то будет виден модальное окно или нет. Функция setVisible, которое будет модальное окно скрывать, если нажмём на тёмную область*/
    const rootClasses = [cl.myModal]

    /*Условие, если visible, то тогда в push добавляем ещё один класс, это класс active*/
    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}> {/*join возвращает строку*/} {/*onClick={() => setVisible(false)}. Закрытие при нажатии на тёмную область, для этого на корневой блок div необходимо повесить слушатель события, вызывать функцию которую мы принимаем пропсом(props) и передавать туда значения false*/}
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}> {/*Класс с контентной частью myModalContent*/} {/*onClick={(e) => e.stopPropagation()}. Для того, чтобы при нажатии на контент, окно не уходило, надо предотвратить всплытие события. Для этого у event есть функция stopPropagation()*/}
                {children}
            </div>
        </div>
    );
};

export default MyModal;