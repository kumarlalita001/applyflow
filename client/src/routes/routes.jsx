import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import AuthPage from '../pages/AuthPage';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';


export const routes = [
  {
    path: '/',
    element: <HomePage />,
    protected: false,
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
    protected: true,
  },
  {
    path: '/auth',
    element: <AuthPage />,
    protected: false,
    children: [
      {
        path: 'login',
        element: <Login />,
        protected: false,
      },
      {
        path: 'register',
        element: <Register />,
        protected: false,
      },
    ],
  },
];

