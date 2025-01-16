//export const BACKEND_URL = 'http://localhost:3000/';
//export const WEB_SOCKEK_URL = 'ws://localhost:3000/ws/comments';
//export const SALESFORCE_URL = 'http://localhost:3000/api/salesforce';
//export const JIRA_URL = 'http://localhost:3000/api/jira/ticket';
export const BACKEND_URL = 'https://project-backend-vf6r.onrender.com/';
export const WEB_SOCKEK_URL = 'ws://project-backend-vf6r.onrender.com/ws/comments';
export const SALESFORCE_URL = 'http://project-backend-vf6r.onrender.com/api/salesforce';
export const JIRA_URL = 'http://project-backend-vf6r.onrender.com/api/jira/ticket';

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
    UserTemplates: '/templates',
};

export const AppRoute = {
    Register: '/register',
    Login: '/login',
    Users: '/users',
    Main: '/',
    CreateTemplates: '/create-template',
    Template: '/template/:id',
    UserTemplates: '/my-templates',
    SalesforceForm: '/salesforce-form',
    CreateTicketPage: '/create-ticket',
};

