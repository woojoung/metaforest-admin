
import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminAdminForm from './Elements/Admin/AdminForm'
import AdminAdminList from './Elements/Admin/AdminList'
import AdminHome from './Elements/Admin/Home'
import AdminLogin from './Elements/Admin/Login'
import AdminLogout from './Elements/Admin/Logout'
import AdminPartnerForm from './Elements/Admin/PartnerForm'
import AdminPartnerList from './Elements/Admin/PartnerList'
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
                <Route path='/admin/admin/form/:id' element={<AdminAdminForm />} />
                <Route path='/admin/admin/form' element={<AdminAdminForm />} />
                <Route path='/admin/admin/list' element={<AdminAdminList />} />
                
                <Route path='/admin/user/form/:id' element={<AdminUserForm />} />
                <Route path='/admin/user/list' element={<AdminUserList />} />
                
                <Route path='/admin/partner/form/:id' element={<AdminPartnerForm />} />
                <Route path='/admin/partner/form' element={<AdminPartnerForm />} />
                <Route path='/admin/partner/list' element={<AdminPartnerList />} />


                

                {/* <Route path='/' element={<Main />} />
                <Route path='*' element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,

    document.getElementById('app')
)
