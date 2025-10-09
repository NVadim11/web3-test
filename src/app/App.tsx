import { router } from '@routes/Router'
import { RouterProvider } from 'react-router-dom';

export const App = () => {
    return <RouterProvider router={router} />;
}

