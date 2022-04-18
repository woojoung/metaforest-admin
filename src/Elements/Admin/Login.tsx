
import React, { FC, BaseSyntheticEvent, Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { eHttpStatus } from '../../Enums/HttpStatus'
import { eApiMessageType } from '../../Enums/ApiMessageType'
import { ApiRequest } from '../../Libs/ApiRequest'
import { hex_md5 } from '../../Libs/MD5'
import { xmlHttp } from '../../Libs/XmlHttp'
import { storage } from '../../Libs/Storage'
import { Footer } from '../Common/Footer'
import { cfg } from '../../Base/Config'
import styles from '../../Styles/Style.module.css'

export const AdminLogin: FC = (props): JSX.Element => {
    const navigate = useNavigate()

    // state
    const [adminEmail, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')

    const [h1] = useState('로그인')

    // event
    const onSubmitForm = (evt: BaseSyntheticEvent): void => {
        console.log('onSubmitForm')
        evt.preventDefault()
        const hexMd5 = hex_md5(adminEmail + hex_md5(passwd))

        const apiRequest = new ApiRequest(eApiMessageType.USER_LOGIN_REQ, {}, adminEmail, hexMd5)
        apiRequest.data = {
        }
        // console.log(apiRequest)
        xmlHttp.request(cfg.apiUrl+'auth/login', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse(false)
            console.log(apiResponse)
            if (apiResponse.status !== eHttpStatus.OK) { alert(apiResponse.status + ' ' + apiResponse.message); return }

            storage.setString('adminId', apiResponse.data.userId)
            storage.setInteger('adminAccessLevel', parseInt(apiResponse.data.accessLevel))
            navigate('/admin/home')
        })
    }

    // render
    return (
        <Fragment>
            <main className={styles.main1}>
                <h1>{h1}</h1>

                <form onSubmit={onSubmitForm}>

                    <p className={styles.p1}><label className={styles.label1}>이메일</label>
                        <input className={styles.input1} type='text' onChange={(evt: BaseSyntheticEvent): void => setEmail(evt.target.value)} /></p>

                    <p className={styles.p1}><label className={styles.label1}>비밀번호</label>
                        <input className={styles.input1} type='password' onChange={(evt: BaseSyntheticEvent): void => setPasswd(evt.target.value)} /></p>

                    <hr />
                    <input className={styles.btnSubmit} type='submit' value='확인' />
                </form>
            </main>
            <Footer />

        </Fragment>
    )
}

export default AdminLogin
