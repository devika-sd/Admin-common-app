  
import currentUser from './services/tokendecoder';
export default {
    items: [
        {
            id: 'navigation',
            title: 'Admin Panel',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                },
                {
                    id: 'basic',
                    title: 'Users',
                    type: 'collapse',
                    icon: 'feather icon-users',
                    children: [
                        {
                            id: 'userlist',
                            title: 'User List',
                            type: 'item',
                            url: '/userlist'
                        },
                        {
                            id: 'adduser',
                            title: 'Add User',
                            type: 'item',
                            url: '/adduser'
                        }
                    ]
                },
                {
                    id: 'book',
                    title: 'Books',
                    type: 'collapse',
                    icon: 'feather icon-book',
                    children: [
                        {
                            id: 'booklist',
                            title: 'Book List',
                            type: 'item',
                            url: '/showbook'
                        },
                        {
                            id: 'addbook',
                            title: 'Add Book',
                            type: 'item',
                            url: '/addbook'
                        }
                    ]
                },
                {
                    id: 'orders',
                    title: 'Orders',
                    type: 'item',
                    url: '/orderlist',
                    classes: 'nav-item',
                    icon: 'feather icon-shopping-cart'
                }
            ]
        }
    ]
}