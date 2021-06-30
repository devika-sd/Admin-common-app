import React from 'react';

const Signin1 = React.lazy(() => import('./Admin-part1/Login/SignIn1'));

const route = [
    { path: '/login', exact: true, name: 'Signin 1', component: Signin1 }
];

export default route;