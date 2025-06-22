// import FormPage from '@/pages/form';
// import NotFound from '@/pages/not-found';
// import { Suspense, lazy } from 'react';
// import { Navigate, Outlet, useRoutes } from 'react-router-dom';

// const DashboardLayout = lazy(
//   () => import('@/components/layout/dashboard-layout')
// );
// // const SignInPage = lazy(() => import('@/pages/auth/signin'));
// const DashboardPage = lazy(() => import('@/pages/dashboard'));
// const StudentPage = lazy(() => import('@/pages/students'));
// const StudentDetailPage = lazy(
//   () => import('@/pages/students/StudentDetailPage')
// );

// ----------------------------------------------------------------------

// export default function AppRouter() {
//   const dashboardRoutes = [
//     {
//       path: '/admin',
//       element: (
//         <DashboardLayout>
//           <Suspense>
//             <Outlet />
//           </Suspense>
//         </DashboardLayout>
//       ),
//       children: [
//         {
//           path: '',
//           element: <DashboardPage />
//         },
//         {
//           path: 'student',
//           element: <StudentPage />
//         },
//         {
//           path: 'student/details',
//           element: <StudentDetailPage />
//         },
//         {
//           path: 'form',
//           element: <FormPage />
//         }
//       ]
//     }
//   ];

//   const publicRoutes = [
//     {
//       path: '/admin/404',
//       element: <NotFound />
//     },
//     {
//       path: '*',
//       element: <Navigate to="/admin/404" replace />
//     }
//   ];

//   const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

//   return routes;
// }
import DashboardLayout from '@/components/layout/dashboard-layout';
import DashboardPage from '@/pages/dashboard';
import StudentPage from '@/pages/students';
import StudentDetailPage from '@/pages/students/StudentDetailPage';
import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import { Navigate, useRoutes } from 'react-router-dom';

export default function AppRouter() {
  const routes = [
    // ✅ Đây là route chính xác cho /admin
    {
      path: '/admin',
      element: <DashboardLayout><DashboardPage /></DashboardLayout>
    },
    {
      path: '/admin/student',
      element: <DashboardLayout><StudentPage /></DashboardLayout>
    },
    {
      path: '/admin/student/details',
      element: <DashboardLayout><StudentDetailPage /></DashboardLayout>
    },
    {
      path: '/admin/form',
      element: <DashboardLayout><FormPage /></DashboardLayout>
    },
    {
      path: '/admin/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/admin/404" replace />
    }
  ];

  return useRoutes(routes);
}
