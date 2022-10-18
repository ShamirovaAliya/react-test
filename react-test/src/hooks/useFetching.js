import { useState } from 'react';

/*Одноимённая стрелочная функция, аргументом будет эта фунция будет принимать callback, некоторый запрос, которым крутилку надо будет показать и после выполнения которого эту крутилку надо будет скрыть*/
export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try { /*Чтобы отлавливать потенциально возможные ошибки*/
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            setError(e.message); /*Обрабатывание случая, когда произошла ошибка. Если произошла ошибка, то вызывается функция setError и туда помещается сообщение из ошибки e.message*/
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}