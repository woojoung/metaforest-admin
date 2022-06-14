
import React, { FC, useState, BaseSyntheticEvent, useEffect, Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { eHttpStatus } from '../../Enums/HttpStatus'
import { eApiMessageType } from '../../Enums/ApiMessageType'
import { ApiRequest } from '../../Libs/ApiRequest'
import { hex_md5 } from '../../Libs/MD5'
import { xmlHttp } from '../../Libs/XmlHttp'
import { storage } from '../../Libs/Storage'
import { AdminNavigation } from './Navigation'
import { Footer } from '../Common/Footer'
import { Loading } from '../Common/Loading'
import { adminCheckAuth } from './Auth'
import { cfg } from '../../Base/Config'
import styles from '../../Styles/Style.module.css'
import { nowStr } from '../../Base/Time'

export const AdminPasswd: FC = (props): JSX.Element => {

    const navigate = useNavigate()

    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('비밀번호 변경')
    const [path1] = useState('admin')

    const [newPasswd, setNewPasswd] = useState('')
    const [retypeNewPasswd, setRetypeNewPasswd] = useState('')

    console.log(adminId)
    // effect
    useEffect(() => {
        if (adminCheckAuth() === false) { return }

        setIsLoaded(true)
    }, [])

    // event
    const onSubmitForm = (evt: BaseSyntheticEvent): void => {
        evt.preventDefault()

        if (newPasswd !== retypeNewPasswd) {
            alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.')
            return
        }
        const hexMd5 = hex_md5(adminId + hex_md5(newPasswd))

        const apiRequest = new ApiRequest(eApiMessageType.ADMIN_CHANGE_PASSWD_USER_REQ)
        apiRequest.data = {
            email: adminId,
            password: hexMd5
        }

        xmlHttp.request(cfg.apiUrl+'admin/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            console.log(apiResponse)
            if (apiResponse.status !== eHttpStatus.OK) { return }

            alert('비밀번호를 변경하였습니다. 다시 로그인하세요.')
            navigate(`/${path1}/logout`)
        })
    }

    // render
    if (isLoaded === false) { return <Loading /> }

    return (
        <Fragment>
            <AdminNavigation admin={{ 'id': adminId, 'accessLevel': adminAccessLevel }} />
            <main className={styles.main1}>
                <h1>{h1}</h1>

                <div>
                    <form onSubmit={onSubmitForm}>

                        <p className={styles.p1}><label className={styles.label1}>새 비밀번호</label>
                            <input className={'input1'} type='password' onChange={(evt: BaseSyntheticEvent): void => setNewPasswd(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.label1}>새 비밀번호 확인</label>
                            <input className={'input1'} type='password' onChange={(evt: BaseSyntheticEvent): void => setRetypeNewPasswd(evt.target.value)} /></p>

                        <hr />
                        <input className={styles.btnSubmit} type='submit' value='확인' />
                    </form>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}

export default AdminPasswd
