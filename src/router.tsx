import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/layout/RouterLayout';
import { SimulationFormPage } from './pages/SimulationFormPage';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',

        element: <SimulationFormPage/>,
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
