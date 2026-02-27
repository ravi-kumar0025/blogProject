import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from "./Pages/Home.jsx"
import Layout from "./components/Layout.jsx"
import AddPost from "./Pages/AddPost.jsx"
import Signup from "./Pages/Signup.jsx"
import EditPost from "./Pages/EditPost.jsx"
import Post from "./Pages/Post.jsx"
import AllPosts from "./Pages/AllPosts.jsx"
import Login from "./Pages/Login.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <Layout authentication={false}>
                        <Login />
                    </Layout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <Layout authentication={false}>
                        <Signup />
                    </Layout>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <Layout authentication>
                        {" "}
                        <AllPosts />
                    </Layout>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <Layout authentication>
                        {" "}
                        <AddPost />
                    </Layout>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <Layout authentication>
                        {" "}
                        <EditPost />
                    </Layout>
                ),
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
