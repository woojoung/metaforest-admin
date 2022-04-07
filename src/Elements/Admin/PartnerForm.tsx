
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
import { adminCheckAuth } from './Auth'
import { cfg } from '../../Base/Config'
import styles from '../../Styles/Style.module.css'
import { nowStr } from '../../Base/Time'
import { Partners } from '../../Models/Partners'

export const AdminPartnerForm: FC = (): JSX.Element => {
    // param
    const params = useParams()
    const navigate = useNavigate()

    const paramId = params.id ? params.id : ''

    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('Partner Form')
    const [path1] = useState('admin')
    const [path2] = useState('partner')
    const [id, setId] = useState(Number(paramId))
    const [inputColor, setInputColor] = useState({ backgroundColor: 'white' })

    const [partnerNickname, setPartnerNickname] = useState('')
    const [code, setCode] = useState('')
    const [plan, setPlan] = useState(0)
    const [planStartTime, setPlanStartTime] = useState('')
    const [planExpiryTime, setPlanExpiryTime] = useState('')
    const [isApproved, setIsApproved] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')

    // api
    const apiGetOne = (): void => {
        if (paramId === '') { setIsLoaded(true); return }

        setInputColor({ backgroundColor: 'lightgray' })

        const apiRequest = new ApiRequest(eApiMessageType.USER_GET_ONE_PARTNER_REQ)
        apiRequest.data = {
            partnerId: id,
        }
        xmlHttp.request(cfg.apiUrl+'partner/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            if (apiResponse.status !== eHttpStatus.OK) { return }

            const row = apiResponse.data.rows[0]
            console.log(apiResponse)
            setId(row.partnerId)

            setPartnerNickname(row.userNickname)
            setCode(row.code)
            setPlan(row.plan)
            setPlanStartTime(row.planStartTime)
            setPlanExpiryTime(row.planExpiryTime)
            setIsApproved(row.isApproved)
            setCreatedAt(row.createdAt)
            setUpdatedAt(row.updatedAt)


            setIsLoaded(true)
        })
    }

       // event
       const onSubmitForm = (evt: BaseSyntheticEvent): void => {
        evt.preventDefault()
        const apiRequest = new ApiRequest(eApiMessageType.USER_UPDATE_REQ)
        apiRequest.data = {
            partnerId: id,
            partnerNickname: partnerNickname,
            code: code,
            plan: plan,
            planStartTime: planStartTime,
            planExpiryTime: planExpiryTime,
            isApproved: isApproved,
            updatedAt: nowStr(),
        }
        xmlHttp.request(cfg.apiUrl+'partner/', apiRequest, (): void => {
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

    const inquiries = new Partners()
    const column = inquiries.columns

    return (
        <Fragment>
            <AdminNavigation admin={{ 'id': adminId, 'accessLevel': adminAccessLevel }} />
            <main className={styles.main1}>
                <h1>{h1}</h1>

                <div>
                    <form className={styles.form1} onSubmit={onSubmitForm}>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['partnerId'].name}</label>
                            <input className={styles.form1Input1} type='text' value={id} readOnly={true} style={{ backgroundColor: 'lightgray' }} onChange={(evt: BaseSyntheticEvent): void => setId(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['partnerNickname'].name}</label>
                            <input className={styles.form1Input1} type='text' value={partnerNickname} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setPartnerNickname(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['code'].name}</label>
                            <input className={styles.form1Input1} type='text' value={code} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setCode(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['plan'].name}</label>
                            <input className={styles.form1Input1} type='text' value={plan} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setPlan(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['planStartTime'].name}</label>
                            <input className={styles.form1Input1} type='text' value={planStartTime} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setPlanStartTime(evt.target.value)} /></p>
                        
                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['planExpiryTime'].name}</label>
                            <input className={styles.form1Input1} type='text' value={planExpiryTime} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setPlanExpiryTime(evt.target.value)} /></p>
                        
                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['isApproved'].name}</label>
                            <input className={styles.form1Input1} type='text' value={isApproved} readOnly={true} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setIsApproved(evt.target.value)} /></p>
                        
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

export default AdminPartnerForm
