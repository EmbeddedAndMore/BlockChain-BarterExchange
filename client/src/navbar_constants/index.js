import { createAsset, dashboard, logout, profile, offer } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'create-asset',
    imgUrl: createAsset,
    link: '/create-asset',
  },
  {
    name: 'offers',
    imgUrl: offer,
    link: '/offers',
    disabled: false,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: false,
  },
];
