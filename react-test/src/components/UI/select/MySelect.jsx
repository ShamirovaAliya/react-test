import React from 'react';

const MySelect = ({ options, defaultValue, value, onChange}) => {
    return (
        <select value={value}
            onChange={event => onChange(event.target.value)}
        >
            {/*Массив опций, т.е. мы будем передавать некоторый массив и на основании этого массива в список будут добавляться пункты, т.е. опции.Но помимо основных опций также необходимо добавить какую-то defaultValue, например чтобы там была надпись сортировка По..., а потом  уже пункты меню: по title, по id, по описанию*/}
            <option disabled value=''>{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;