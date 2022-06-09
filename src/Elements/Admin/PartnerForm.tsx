
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
import { adminCheckAuth } from './Auth'
import { cfg } from '../../Base/Config'
import styles from '../../Styles/Style.module.css'
import { nowStr, toLocalTimeStr, newTime } from '../../Base/Time'
import { Partners } from '../../Models/Partners'
import { ePlanType } from '../../Enums/PlanType'
import DatePicker from 'react-datepicker'
import '~react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'

export const AdminPartnerForm: FC = (): JSX.Element => {
    // param
    const params = useParams()
    const navigate = useNavigate()

    const paramId = params.id ? params.id : ''

    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('기관')
    const [path1] = useState('admin')
    const [path2] = useState('partner')
    const [id, setId] = useState(Number(paramId))
    const [inputColor, setInputColor] = useState({ backgroundColor: 'white' })

    const [partnerNickname, setPartnerNickname] = useState('')
    const [code, setCode] = useState('')
    const [plan, setPlan] = useState(0)
    const [planStartTime, setPlanStartTime] = useState(new Date())
    const [planExpiryTime, setPlanExpiryTime] = useState(new Date())
    const [isApproved, setIsApproved] = useState('N')
    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')

    // api
    const apiGetOne = (): void => {
        if (paramId === '') { 
            setId(Number(paramId))
            setPartnerNickname('')
            setCode('')
            setPlan(0)
            setPlanStartTime(new Date())
            setPlanExpiryTime(new Date())
            setIsApproved('N')
            setCreatedAt('')
            setUpdatedAt('')
            setIsLoaded(true)
            return 
        }

        setInputColor({ backgroundColor: 'lightgray' })

        const apiRequest = new ApiRequest(eApiMessageType.ADMIN_GET_ONE_PARTNER_REQ)
        apiRequest.data = {
            partnerId: id,
        }
        xmlHttp.request(cfg.apiUrl+'admin/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            // console.log(apiResponse)
            if (apiResponse.status !== eHttpStatus.OK) { return }

            const row = apiResponse.data.rows
            // console.log(row)
            setId(row.partnerId)

            setPartnerNickname(row.partnerNickname)
            setCode(row.code)
            setPlan(row.plan)
            setPlanStartTime(newTime(row.planStartTime))
            setPlanExpiryTime(newTime(row.planExpiryTime))
            setIsApproved(row.isApproved)
            setCreatedAt(toLocalTimeStr(row.createdAt))
            setUpdatedAt(toLocalTimeStr(row.updatedAt))


            setIsLoaded(true)
            setInputColor({ backgroundColor: 'white' })
        })
    }

    // event
    const onSubmitForm = (evt: BaseSyntheticEvent): void => {
        evt.preventDefault()
        const apiRequest = new ApiRequest()
        apiRequest.msgType = (paramId === '') ? eApiMessageType.ADMIN_CREATE_PARTNER_REQ : eApiMessageType.ADMIN_UPDATE_PARTNER_REQ
        apiRequest.data = {
            partnerId: id,
            partnerNickname: partnerNickname,
            code: code,
            plan: plan,
            planStartTime: newTime(planStartTime).toPlanStartDateTimeFormat(),
            planExpiryTime: newTime(planExpiryTime).toPlanExpiryDateTimeFormat(),
            isApproved: isApproved,
            updatedAt: nowStr(),
        }
        xmlHttp.request(cfg.apiUrl+'admin/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            console.log(apiResponse)
            if (apiResponse.status !== 200) { return }

            let message = '수정하였습니다.'
            if (paramId === '') { message = '추가하였습니다.' }

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

    const partners = new Partners()
    const column = partners.columns

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
                            <input className={styles.form1Input1} type='text' value={partnerNickname} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setPartnerNickname(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['code'].name}</label>
                            <input className={styles.form1Input1} type='text' value={code} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setCode(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['plan'].name}</label>
                            <select value={plan} onChange={(evt: BaseSyntheticEvent): void => setPlan(evt.target.value)}>
                                <option key={ePlanType.NONE} value={ePlanType.NONE}>{'플랜 해지'}</option>
                                <option key={ePlanType.FREE_TRIAL} value={ePlanType.FREE_TRIAL}>{'FREE_TRIAL'}</option>
                                <option key={ePlanType.BASIC} value={ePlanType.BASIC}>{'BASIC'}</option>
                                <option key={ePlanType.PRO} value={ePlanType.PRO}>{'PRO'}</option>
                                <option key={ePlanType.PREMIUM} value={ePlanType.PREMIUM}>{'PREMIUM'}</option>
                            </select></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['planStartTime'].name}</label>
                            {/* <input className={styles.form1Input1} type='text' value={planStartTime} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setPlanStartTime(evt.target.value)} /> */}
                            <DatePicker 
                                locale={ko}
                                dateFormat={'yyyy-MM-dd'}
                                selected={planStartTime} 
                                onChange={(date: Date) => setPlanStartTime(date)}
                                selectsStart
                                startDate={planStartTime}
                                endDate={planExpiryTime}
                            />
                        </p>
                        
                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['planExpiryTime'].name}</label>
                            {/* <input className={styles.form1Input1} type='text' value={planExpiryTime} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setPlanExpiryTime(evt.target.value)} /> */}
                            <DatePicker 
                                locale={ko}
                                dateFormat={'yyyy-MM-dd'}
                                selected={planExpiryTime} 
                                onChange={(date: Date) => setPlanExpiryTime(date)}
                                selectsEnd
                                startDate={planStartTime}
                                endDate={planExpiryTime}
                                minDate={planStartTime}
                            />
                        </p>
                        
                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['isApproved'].name}</label>
                            <select value={isApproved} onChange={(evt: BaseSyntheticEvent): void => setIsApproved(evt.target.value)}>
                                <option key={'N'} value={'N'}>{'미승인'}</option>
                                <option key={'Y'} value={'Y'}>{'승인'}</option>
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

export default AdminPartnerForm
