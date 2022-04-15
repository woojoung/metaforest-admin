
import React, { FC, useState, useEffect, Fragment, BaseSyntheticEvent, useImperativeHandle } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { eHttpStatus } from '../../Enums/HttpStatus'
import { eApiMessageType } from '../../Enums/ApiMessageType'
import { ApiRequest } from '../../Libs/ApiRequest'
import { xmlHttp } from '../../Libs/XmlHttp'
import { storage } from '../../Libs/Storage'
import { AdminNavigation } from './Navigation'
import { Footer } from '../Common/Footer'
import { Loading } from '../Common/Loading'
import { Users } from '../../Models/Users'
import { adminCheckAuth } from './Auth'
import { cfg } from '../../Base/Config'
import styles from '../../Styles/Style.module.css'
import { nowStr, toLocalTimeStr } from '../../Base/Time'

export const AdminAdminForm: FC = (): JSX.Element => {
    // param
    const params = useParams()
    const paramId = params.id ? params.id : ''

    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('관리자')
    const [path1] = useState('admin')
    const [path2] = useState('admin')
    const [id, setId] = useState(Number(paramId))
    const [inputColor, setInputColor] = useState({ backgroundColor: 'white' })

    const [email, setEmail] = useState('')
    const [accessLevel, setAccessLevel] = useState(0)

    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')

    const navigate = useNavigate()

    // api
    const apiGetOne = (): void => {
        if (paramId === '') { setIsLoaded(true); return }

        setInputColor({ backgroundColor: 'lightgray' })

        const apiRequest = new ApiRequest(eApiMessageType.USER_GET_ONE_INFO_REQ)
        apiRequest.data = {
            userId: id,
        }
        xmlHttp.request(cfg.apiUrl+'user/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            console.log(apiResponse)
            if (apiResponse.status !== eHttpStatus.OK) { return }

            const row = apiResponse.data.rows
            console.log(row)
            setId(row.userId)
            setEmail(row.email)
            setAccessLevel(row.accessLevel)
            setCreatedAt(toLocalTimeStr(row.createdAt))
            setUpdatedAt(toLocalTimeStr(row.updatedAt))

            setIsLoaded(true)
        })
    }

       // event
       const onSubmitForm = (evt: BaseSyntheticEvent): void => {
        evt.preventDefault()
        const apiRequest = new ApiRequest()
        apiRequest.msgType = (paramId === '') ? eApiMessageType.USER_CREATE_REQ : eApiMessageType.USER_UPDATE_REQ
        apiRequest.data = {
            userId: id,
            email: email,
            accessLevel: accessLevel,
            updatedAt: nowStr(),
        }
        xmlHttp.request(cfg.apiUrl+'user/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            console.log(apiResponse)
            if (apiResponse.status !== 200) { return }

            let message = '수정하였습니다.'
            if (paramId === '') { message = '추가하였습니다.' }
            alert(message)

            if (confirm(message)) {
                navigate(`/${path1}/${path2}list`)
            }           
        })
    }

    // effect
    useEffect(() => {
        if (adminCheckAuth() === false) { return }

        apiGetOne()
    }, [])

    // render
    if (isLoaded === false) { return <Loading /> }

    const inquiries = new Users()
    const column = inquiries.columns

    return (
        <Fragment>
            <AdminNavigation admin={{ 'id': adminId, 'accessLevel': adminAccessLevel }} />
            <main className={styles.main1}>
                <h1>{h1}</h1>

                <div>
                    <form className={styles.form1} onSubmit={onSubmitForm}>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['userId'].name}</label>
                            <input className={styles.form1Input1} type='text' value={id} readOnly={true} style={{ backgroundColor: 'lightgray' }} onChange={(evt: BaseSyntheticEvent): void => setId(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['email'].name}</label>
                            <input className={styles.form1Input1} type='text' value={email} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setEmail(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['accessLevel'].name}</label>
                            <input className={styles.form1Input1} type='text' value={accessLevel} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setAccessLevel(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['createdAt'].name}</label>
                            <input className={styles.form1Input1} type='text' value={createdAt} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setCreatedAt(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['updatedAt'].name}</label>
                            <input className={styles.form1Input1} type='text' value={updatedAt} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setUpdatedAt(evt.target.value)} /></p>

                        <hr />
                        <input className={styles.btnSubmit1} type='submit' value='확인' />
                    </form>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}

export default AdminAdminForm
