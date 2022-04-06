
import React, { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { eHttpStatus } from '../../Enums/HttpStatus'
import { eApiMessageType } from '../../Enums/ApiMessageType'
import { cfg } from '../../Base/Config'
import { ApiRequest } from '../../Libs/ApiRequest'
import { xmlHttp } from '../../Libs/XmlHttp'
import { storage } from '../../Libs/Storage'
import { Loading } from '../Common/Loading'

export const AdminLogout: FC = (props): JSX.Element => {

    const navigate = useNavigate()

    // state

    // effect
    useEffect(() => {
        // const apiRequest = new ApiRequest(eApiMessageType.ADMIN_LOGOUT_REQ)

        // xmlHttp.request(cfg.apiUrl, apiRequest, (): void => {
        //     const apiResponse = xmlHttp.parseResponse()
        //     if (apiResponse.status !== eHttpStatus.OK) { return }

        //     /*
        //     if (responseBody.errCode !== eErrorCode.NONE) {
        //         alert('로그아웃 실패')
        //         return
        //     }
        //     */

        //     storage.clear()
        //     navigate('/admin/login')
        // })
        storage.clear()
        navigate('/admin/login')
    }, [])

    // render
    return <Loading />
}

export default AdminLogout
