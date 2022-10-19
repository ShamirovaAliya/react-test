import About from '../pages/About';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import Login from '../pages/Login';
import Error from '../pages/Error';

/*Экспортация константы, которую проинициализируем массивом. Написание маршрутов. Объекты, содержащие нужные поля*/
/*Один массив privateRoutes для автор-ных пользователей, а второй массив publicRoutes для тех кто только пытается зайти*/
export const privateRoutes = [
    { path: `/about`, component: <About />, exact: true },
    { path: `/posts`, component: <Posts />, exact: true },
    { path: `/posts/:id`, component: <PostIdPage />, exact: true },
    { path: `/error`, component: <Error />, exact: true },
];

export const publicRoutes = [
    { path: `/login`, component: <Login />, exact: true },
];