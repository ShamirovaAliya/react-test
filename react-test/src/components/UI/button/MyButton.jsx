import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children} {/*Специальный props, который называется children, чтобы внутри тега (button, p, div и т.д.) был виден текст*/}
        </button>
    );
};

export default MyButton;