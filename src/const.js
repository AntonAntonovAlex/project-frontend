//export const BACKEND_URL = 'http://localhost:3000/';
export const BACKEND_URL = 'https://project-backend-vf6r.onrender.com/';

export const NameSpace = {
    User: 'USER',
    Template: 'TEMPLATE',
};

export const AuthorizationStatus = {
    Auth: 'AUTH',
    NoAuth: 'NO_AUTH',
    Unknown: 'UNKNOWN',
};

export const APIRoute = {
    Register: '/register',
    Login: '/login',
    Logout: '/logout',
    Users: '/users',
    Templates: '/template',
    LatestTemplates: '/templates/latest',
    MostPopularTemplates: '/templates/popular',
    PostTemplates: '/template/create',
    Topics: '/topics',
    Form: '/form',
    Comments: '/comments',
    Likes: '/likes',
};

export const AppRoute = {
    Register: '/register',
    Login: '/login',
    Users: '/users',
    Main: '/',
    CreateTemplates: '/create-template',
    Template: '/template/:id',
};

