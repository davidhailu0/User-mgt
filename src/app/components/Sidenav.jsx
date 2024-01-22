import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { styled } from '@mui/material';
import { MatxVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import useAuth from 'app/hooks/useAuth';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative'
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' }
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const { user } = useAuth();
  const userRole = user?.authorities[0]?.authority || '';
  

  let navigations = []

  

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  }; 
  if (userRole == "ROLE_CHECKER") {

   navigations = [
    { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
    { label: 'PAGES', type: 'label' },
    {
      name: 'Hajj',//like unorder list
      icon: 'airplane',
      children: [//like list in side UNORDER LIST
        // { name: 'Appliciant', iconText: 'SI', path: '/showhajjapplicant' },
        // { name: 'Mobile Appliciant', iconText: 'SI', path: '/mobhajjapplicant' },
        
        { name: 'Authorize Transaction', iconText: 'SI', path: '/authorizetransaction' },
        { name: 'All Appliciant', iconText: 'SI', path: '/showallapplicant' },
        { name: 'Old Pay Slip', iconText: 'SI', path: '/showSlip' },
        
      ]
    },
  ];
}else{
   navigations = [
    { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
    { label: 'PAGES', type: 'label' },
    {
      name: 'Hajj',//like unorder list
      icon: 'airplane',
      children: [//like list in side UNORDER LIST
        { name: 'Appliciant', iconText: 'SI', path: '/showhajjapplicant' },
        { name: 'Mobile Appliciant', iconText: 'SI', path: '/mobhajjapplicant' },
        
        // { name: 'Authorize Transaction', iconText: 'SI', path: '/authorizetransaction' },
        { name: 'All Appliciant', iconText: 'SI', path: '/showallapplicant' },
        { name: 'Old Pay Slip', iconText: 'SI', path: '/showSlip' },
        
      ]
    },
  ];

}

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {/* {children} */}
        <MatxVerticalNav items={navigations} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
