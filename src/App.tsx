
import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminHome from './Elements/Admin/Home'
import AdminLogin from './Elements/Admin/Login'
import AdminLogout from './Elements/Admin/Logout'
import AdminUserForm from './Elements/Admin/UserForm'
import AdminUserList from './Elements/Admin/UserList'
import './Styles/Style.css'
//admin component

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* //admin */}
                <Route path='/admin/home' element={<AdminHome />} />
                <Route path='/admin/login' element={<AdminLogin />} />
                <Route path='/admin/logout' element={<AdminLogout />} />
                {/* <Route path='/admin/form/:id?' element={<AdminAdminForm />} />
                <Route path='/admin/list' element={<AdminAdminList />} /> */}

                <Route path='/admin/user/form/:id?' element={<AdminUserForm />} />
                <Route path='/admin/user/list' element={<AdminUserList />} />

                

                {/* <Route path='/' element={<Main />} />
                <Route path='*' element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,

    document.getElementById('app')
)
