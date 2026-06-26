import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/layout/RouterLayout';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',

        element: <h1>resultado</h1>,
      },
      {
        path: '/resultado',
        element: <h1>formulario</h1>,
      },
      {
        path: '/historico',
        element: <h1>histórico</h1>,
      },
    ],
  },
]);
