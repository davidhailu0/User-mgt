import { lazy } from 'react';
import React from 'react'
import useAuth from './hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

//start from here
const HajjAppliciant = Loadable(lazy(() => import('./views/hajj/HajjAppliciant')));
const MobHajjAppliciant = Loadable(lazy(() => import('./views/hajj/Mobile/MobHajjAppliciant')));
const CheckTransaction = Loadable(lazy(() => import('./views/hajj/Check/CheckTransaction')));
const ShowAll = Loadable(lazy(() => import('./views/hajj/Report/ShowAll')));
const Slip = Loadable(lazy(() => import('./views/hajj/Slip')));


const MyComponent = () => {

  const { user,lastActive,registerLastActive} = useAuth();
  const userRole = user?.authorities?.[0]?.authority || '';
  const router = useNavigate()
  
  useEffect(()=>{
    document.addEventListener("mouseover",(ev)=>{
      ev.stopPropagation()
      if(user){
        const minutes = ((Date.now()-lastActive)/1000)/60
        if(minutes>=2){
          localStorage.removeItem("token")
          router("/signin")
        }
        else{
          registerLastActive()
        }
      }
    })
  },[user])

  let routes = []

  if (userRole == "ROLE_CHECKER") {
    //console.log("ROLE_MAKER", userRole)
    routes = [
      {
        element: (
          <AuthGuard>
            <MatxLayout />
          </AuthGuard>
        ),
        children: [
          //  ...materialRoutes,//add all llinks inside materialRoutes
          // dashboard route
          {
            path:"/",
            element: <Analytics />
          },
          {
            path: '/dashboard',
            element: <Analytics />,
            // auth: authRoles.admin
          },
          //add all llinks inside materialRoutes
          // { path: '/material/showhajjapplicant', element: <HajjAppliciant /> },
          { path: '/mobhajjapplicant', element: <MobHajjAppliciant /> },
          { path: '/authorizetransaction', element: <CheckTransaction /> },
          { path: '/showallapplicant', element: <ShowAll /> },
          { path: '/showSlip', element: <Slip /> },


        ]
      },

      // session pages route
      { path: '/404', element: <NotFound /> },
      { path: '/signin', element: <JwtLogin /> },
      { path: '/signup', element: <JwtRegister /> },
      { path: '/forgot-password', element: <ForgotPassword /> },


      { path: '*', element: <NotFound /> }
    ];
  } else  {
    //console.log("ROLE_CHECKER", userRole)
    routes = [
      {
        element: (
          <AuthGuard>
            <MatxLayout />
          </AuthGuard>
        ),
        children: [
          //  ...materialRoutes,//add all llinks inside materialRoutes
          // dashboard route
          {
            path: '/',
            element: <JwtLogin />,
            // auth: authRoles.admin
          },
          {
            path: '/dashboard',
            element: <Analytics />,
            // auth: authRoles.admin
          },
          //add all llinks inside materialRoutes
          { path: '/showhajjapplicant', element: <HajjAppliciant /> },
          { path: '/mobhajjapplicant', element: <MobHajjAppliciant /> },
          // { path: '/material/authorizetransaction', element: <CheckTransaction /> },
          { path: '/showallapplicant', element: <ShowAll /> },
          { path: '/showSlip', element: <Slip /> },


        ]
      },
      { path: '/signin', element: <JwtLogin /> },
      // session pages route
      { path: '/404', element: <NotFound /> },
      
      { path: '/signup', element: <JwtRegister /> },
      { path: '/forgot-password', element: <ForgotPassword /> },


      { path: '*', element: <NotFound /> }
    ];
  }
  

  return useRoutes(routes);

};

export default MyComponent;

 
