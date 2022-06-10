
import React, { FC, useState, useEffect, Fragment, BaseSyntheticEvent } from 'react'
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
import { hex_md5 } from '../../Libs/MD5'
import { eAccessLevel } from '../../Enums/AccessLevel'
import { text } from '../../Libs/Localization'

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

    const [userNickname, setUserNickname] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [accountId, setAccountId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [birth, setBirth] = useState('')
    const [md5Mobile, setMd5Mobile] = useState('')
    const [marketingAgreeTime, setMarketingAgreeTime] = useState(0)
    const [partnerId, setPartnerId] = useState(0)
    const [accessLevel, setAccessLevel] = useState(0)

    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')

    const navigate = useNavigate()

    // api
    const apiGetOne = (): void => {
        if (paramId === '') { 
            setId(Number(paramId))

            setUserNickname('')
            setProfileImageUrl('')
            setAccountId('')
            setEmail('')
            setGender('')
            setBirth('')
            setMd5Mobile('')
            setMarketingAgreeTime(0)
            setPartnerId(0)
            setAccessLevel(0)
            setCreatedAt('')
            setUpdatedAt('')

            setIsLoaded(true)
            return }

        setInputColor({ backgroundColor: 'lightgray' })

        const apiRequest = new ApiRequest(eApiMessageType.ADMIN_GET_ONE_USER_REQ)
        apiRequest.data = {
            userId: id,
        }
        xmlHttp.request(cfg.apiUrl+'admin/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            console.log(apiResponse)
            if (apiResponse.status !== eHttpStatus.OK) { return }

            const row = apiResponse.data.rows
            console.log(row)
            setId(row.userId)

            setUserNickname(row.userNickname)
            setProfileImageUrl(row.profileImageUrl)
            setAccountId(row.accountId)
            setEmail(row.email)
            setGender(row.gender)
            setBirth(row.birth)
            setMd5Mobile(row.md5Mobile)
            setMarketingAgreeTime(row.marketingAgreeTime)
            setPartnerId(row.partnerId)
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
        apiRequest.msgType = (paramId === '') ? eApiMessageType.ADMIN_CREATE_USER_REQ : eApiMessageType.ADMIN_UPDATE_USER_REQ
        const hexMd5 = hex_md5(email + hex_md5(password))
        apiRequest.data = (paramId === '') ? {
            userId: id,
            email: email,
            password: hexMd5,
            accessLevel: accessLevel,
            createdAt: nowStr(),
        } : {
            userId: id,
            userNickname: userNickname,
            profileImageUrl: profileImageUrl,
            accountId: accountId,
            email: email,
            gender: gender,
            birth: birth,
            md5Mobile: md5Mobile,
            marketingAgreeTime: marketingAgreeTime,
            partnerId: partnerId,
            accessLevel: accessLevel,
            updatedAt: nowStr(),
        }
        xmlHttp.request(cfg.apiUrl+'admin/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            console.log(apiResponse)
            if (apiResponse.status !== 200) { return }

            let message = '수정하였습니다.'
            if (paramId === '') { message = '추가하였습니다.' }
            alert(message)

            storage.setInteger('adminAccessLevel', accessLevel)

            if (confirm(message)) {
                navigate(`/${path1}/${path2}/list`)
            }           
        })
    }

    // effect
    useEffect(() => {
        if (adminCheckAuth() === false) { return }

        apiGetOne()
    }, [paramId])

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

                        <p className={styles.p1}><label className={styles.Form1Label1}>{'관리자 No'}</label>
                            <input className={styles.form1Input1} type='text' value={id} readOnly={true} style={{ backgroundColor: 'lightgray' }} onChange={(evt: BaseSyntheticEvent): void => setId(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{'관리자 이름'}</label>
                            <input className={styles.form1Input1} type='text' value={userNickname} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setUserNickname(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{'관리자ID'}</label>
                            <input className={styles.form1Input1} type='text' value={email} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setEmail(evt.target.value)} /></p>

                        {id === 0 ? <p className={styles.p1}><label className={styles.Form1Label1}>{column['password'].name}</label>
                            <input className={styles.form1Input1} type='text' value={password} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setPassword(evt.target.value)} /></p> : ''}

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['accessLevel'].name}</label>
                            <select value={accessLevel} onChange={(evt: BaseSyntheticEvent): void => setAccessLevel(evt.target.value)}>
                                <option key={eAccessLevel.SERVICE_OPERATOR} value={eAccessLevel.SERVICE_OPERATOR}>{text(eAccessLevel[eAccessLevel.SERVICE_OPERATOR])}</option>
                                <option key={eAccessLevel.SERVICE_ADMIN} value={eAccessLevel.SERVICE_ADMIN}>{text(eAccessLevel[eAccessLevel.SERVICE_ADMIN])}</option>
                            </select></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['createdAt'].name}</label>
                            <input className={styles.form1Input1} type='text' value={createdAt} readOnly={true} style={{ backgroundColor: 'lightgray' }} onChange={(evt: BaseSyntheticEvent): void => setCreatedAt(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['updatedAt'].name}</label>
                            <input className={styles.form1Input1} type='text' value={updatedAt} readOnly={true} style={{ backgroundColor: 'lightgray' }} onChange={(evt: BaseSyntheticEvent): void => setUpdatedAt(evt.target.value)} /></p>

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
