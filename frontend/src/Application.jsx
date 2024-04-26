import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  Dashboard,
  ErrorPage,
  Home,
  Insights,
  Profile,
  ResetPassword,
  Track,
} from '@src/pages';
import {
  Layout,
  Protected,
} from '@src/components/layout';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleExclamation, faCircleNotch, faEye, faEyeSlash, faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faCircleExclamation, faCircleNotch, faEye, faEyeSlash, faPlus);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

const router = createBrowserRouter(createRoutesFromElements(
  <Route errorElement={<ErrorPage />}>
    <Route path={'/'}>
      <Route index element={<Home />} />
      <Route path={'password-reset/:id'} element={<ResetPassword />} />
    </Route>
      <Route path={'/dashboard'} element={<Protected><Layout /></Protected>}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path={'/track'} element={<Protected><Layout /></Protected>}>
        <Route index element={<Track />} />
      </Route>
      <Route path={'/insights'} element={<Protected><Layout /></Protected>}>
        <Route index element={<Insights />} />
      </Route>
      <Route path={'/profile'} element={<Protected><Layout /></Protected>}>
        <Route index element={<Profile />} />
      </Route>
  </Route>,
));

const Application = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Application;
