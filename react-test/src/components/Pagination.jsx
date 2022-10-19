import React from 'react';
import { getPageArray } from '../utils/pages';


/*Нумерация страниц*/
const Pagitaion = ({ totalPages, page, changePage }) => {
    let pagesArray = getPageArray(totalPages);

    return (
        <div className="page__wrapper">
            {pagesArray.map(pageIndex =>
                <span
                    onClick={() => changePage(pageIndex)}
                    key={pageIndex}
                    className={pageIndex == page ? 'page page__current' : 'page'}>
                    {pageIndex}
                </span>
            )}
        </div>
    )
}

export default Pagitaion;