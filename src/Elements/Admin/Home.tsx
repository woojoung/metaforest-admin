
import React, { FC, useState, useEffect, Fragment, BaseSyntheticEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { eHttpStatus } from '../../Enums/HttpStatus'
import { eApiMessageType } from '../../Enums/ApiMessageType'
import { xmlHttp } from '../../Libs/XmlHttp'
import { storage } from '../../Libs/Storage'
import { ApiRequest } from '../../Libs/ApiRequest'
import { AdminNavigation } from './Navigation'
import { Footer } from '../Common/Footer'
import { Loading } from '../Common/Loading'
import { cfg } from '../../Base/Config'
import { eEnvironment } from '../../Enums/Environment'
import styles from '../../Styles/Style.module.css'

export const AdminHome: FC = (props): JSX.Element => {

    // param
    const params = useParams()
    const paramId = params.id ? params.id : ''
    // console.log(paramId)

    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('홈')

    // effect
    useEffect(() => {

        // const apiRequest = new ApiRequest(eApiMessageType.SERVER_TEST_REQ)

        // xmlHttp.request(cfg.apiUrl, apiRequest, (): void => {
        //     const apiResponse = xmlHttp.parseResponse()
        //     if (apiResponse.status !== eHttpStatus.OK) { return }

        //     setIsLoaded(true)
        // })

        setIsLoaded(true)
    }, [])

    // event


    // render
    if (isLoaded === false) { return <Loading /> }

    return (
        <Fragment>
            <AdminNavigation admin={{ 'id': adminId, 'accessLevel': adminAccessLevel }} />
            <main className={styles.main1}>
                <h1>{h1}</h1>
            </main>
            <Footer />
        </Fragment>
    )
}

export default AdminHome
