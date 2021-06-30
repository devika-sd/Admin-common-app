import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Admin-part1/Dashboard/Dashboard'));
const Orders = React.lazy(() => import('./Admin-part1/Orders/Orders'));
const OrdersModel = React.lazy(() => import('./Admin-part1/Orders/OrderModel'));
const UserList = React.lazy(() => import('./Admin-part1/Userlist/UserList'));
const AddUser = React.lazy(() => import('./Admin-part1/Adduser/Adduser'));
const ProfilePage = React.lazy(() => import('./Admin-part1/Profile/ProfilePage'));

const AddBookPage = React.lazy(() => import('./Admin-part2/Booklist/AddBook'));
const ViewBookPage = React.lazy(() => import('./Admin-part2/Booklist/ViewBook'));
const BookListPage = React.lazy(() => import('./Admin-part2/Booklist/BookList'));


const routes = [
    { path: '/dashboard', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/orderlist', exact: true, name: 'Basic Badges', component: Orders },
    { path: '/userlist', exact: true, name: 'Basic Tabs & Pills', component: UserList },
    { path: '/adduser', exact: true, name: 'Basic Typography', component: AddUser },
    { path: '/profile/:id', exact: true, name: 'Sample Page', component: ProfilePage },
    { path: '/booklist', exact: true, name: 'Sample Page', component: BookListPage },
    { path: '/addbook', exact: true, name: 'Sample Page', component: AddBookPage },
    { path: '/orderModel', exact: true, name: 'Sample Page', component: OrdersModel },
    { path: '/viewbook', exact: true, name: 'Sample Page', component: ViewBookPage }
];

export default routes;