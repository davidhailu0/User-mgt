import { lazy } from 'react';
import Loadable from 'app/components/Loadable';


const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));


//start from here
const HajjAppliciant = Loadable(lazy(() => import('../hajj/HajjAppliciant')));
const MobHajjAppliciant = Loadable(lazy(() => import('../hajj/Mobile/MobHajjAppliciant')));
const CheckTransaction = Loadable(lazy(() => import('../hajj/Check/CheckTransaction')));
const ShowAll = Loadable(lazy(() => import('../hajj/Report/ShowAll')));
const Slip = Loadable(lazy(() => import('../hajj/Slip')));



const materialRoutes = [
  { path: '/material/table', element: <AppTable /> },
  { path: '/material/form', element: <AppForm /> },
  { path: '/material/buttons', element: <AppButton /> },
  { path: '/material/icons', element: <AppIcon /> },
  { path: '/material/progress', element: <AppProgress /> },
  { path: '/material/menu', element: <AppMenu /> },
  { path: '/material/checkbox', element: <AppCheckbox /> },
  { path: '/material/switch', element: <AppSwitch /> },
  { path: '/material/radio', element: <AppRadio /> },
  { path: '/material/dialog', element: <AppDialog /> },
  { path: '/showhajjapplicant', element: <HajjAppliciant /> },
  { path: '/mobhajjapplicant', element: <MobHajjAppliciant /> },
  { path: '/authorizetransaction', element: <CheckTransaction /> },
  { path: '/showallapplicant', element: <ShowAll /> },
  { path: '/showSlip', element: <Slip /> },
  { path: '/material/snackbar', element: <AppSnackbar /> }
];

export default materialRoutes;
