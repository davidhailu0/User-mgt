export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'PAGES', type: 'label' },
  {
    name: 'Hajj',//like unorder list
    icon: 'airplane',
    children: [//like list in side UNORDER LIST
      { name: 'Appliciant', iconText: 'SI', path: '/showhajjapplicant' },
      { name: 'Mobile Appliciant', iconText: 'SI', path: '/mobhajjapplicant' },
      
      { name: 'Authorize Transaction', iconText: 'SI', path: '/authorizetransaction' },
      { name: 'All Appliciant', iconText: 'SI', path: '/showallapplicant' },
      { name: 'Old Pay Slip', iconText: 'SI', path: '/showSlip' },
      
    ]
  },
  
  
];
