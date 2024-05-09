import React from 'react';
import Admin from "@/page/admin";
import Test from "@/page/test";
export const normalRoutes=[
    {path:'/',element: <Admin/>,
        children:[
            {path:'menu',element:<Test/>},
            {path:'role',element:<Test/>},
            {path:'group',element:<Test/>},
        ]
    }
];
export default [
    {path:'/',element: 'admin',
        children:[
            {path:'menu',element:'test'},
            {path:'role',element:'test'},
            {path:'group',element:'test'},
        ]
    }
];
