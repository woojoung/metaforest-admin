
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

export const AdminUserForm: FC = (): JSX.Element => {
    // param
    const params = useParams()
    const navigate = useNavigate()

    const paramId = params.id ? params.id : ''

    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('User Form')
    const [path1] = useState('admin')
    const [path2] = useState('user')
    const [id, setId] = useState(Number(paramId))
    const [inputColor, setInputColor] = useState({ backgroundColor: 'white' })

    const [userNickname, setUserNickname] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [accountId, setAccountId] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [birth, setBirth] = useState('')
    const [md5Mobile, setMd5Mobile] = useState('')
    const [marketingAgreeTime, setMarketingAgreeTime] = useState(0)
    const [partnerId, setPartnerId] = useState(0)
    const [accessLevel, setAccessLevel] = useState(0)

    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')

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
            if (apiResponse.status !== eHttpStatus.OK) { return }

            const row = apiResponse.data.rows
            console.log(apiResponse)
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
        const apiRequest = new ApiRequest(eApiMessageType.USER_UPDATE_REQ)
        apiRequest.data = {
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
        xmlHttp.request(cfg.apiUrl+'user/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            console.log(apiResponse)
            if (apiResponse.status !== 200) { return }

            let message = '수정하였습니다.'
            if (paramId === '') { message = '추가하였습니다.' }
            alert(message)

            if (confirm(message)) {
                navigate(`/${path1}/${path2}/list`)
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

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['userNickname'].name}</label>
                            <input className={styles.form1Input1} type='text' value={userNickname} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setUserNickname(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['profileImageUrl'].name}</label>
                            <input className={styles.form1Input1} type='text' value={profileImageUrl} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setProfileImageUrl(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['accountId'].name}</label>
                            <input className={styles.form1Input1} type='text' value={accountId} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setAccountId(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['email'].name}</label>
                            <input className={styles.form1Input1} type='text' value={email} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setEmail(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['gender'].name}</label>
                            <input className={styles.form1Input1} type='text' value={gender} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setGender(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['birth'].name}</label>
                            <input className={styles.form1Input1} type='text' value={birth} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setBirth(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['md5Mobile'].name}</label>
                            <input className={styles.form1Input1} type='text' value={md5Mobile} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setMd5Mobile(evt.target.value)} /></p>

                            <p className={styles.p1}><label className={styles.Form1Label1}>{column['marketingAgreeTime'].name}</label>
                            <input className={styles.form1Input1} type='text' value={marketingAgreeTime} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setMarketingAgreeTime(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['partnerId'].name}</label>
                            <input className={styles.form1Input1} type='text' value={partnerId} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setPartnerId(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['accessLevel'].name}</label>
                            <input className={styles.form1Input1} type='text' value={accessLevel} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setAccessLevel(evt.target.value)} /></p>

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

export default AdminUserForm
