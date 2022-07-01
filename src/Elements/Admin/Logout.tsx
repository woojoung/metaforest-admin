
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

    const getCookie = (name: string) => {
        return document.cookie.split(';').some(c => {
          return c.trim().startsWith(name + '=');
        });
      }

    const deleteCookie = (name: string, path: string, domain: string) => {
        if (getCookie(name)) {
          document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
      }

    // effect
    useEffect(() => {
        const apiRequest = new ApiRequest(eApiMessageType.USER_LOGOUT_REQ)

        xmlHttp.request(cfg.apiUrl+'auth/logout', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            if (apiResponse.status !== eHttpStatus.OK) { return }

            /*
            if (responseBody.errCode !== eErrorCode.NONE) {
                alert('로그아웃 실패')
                return
            }
            */

            storage.clear()
            deleteCookie('meta_sid', window.location.pathname, window.location.hostname)
            navigate('/admin/login')
        })
    }, [])

    // render
    return <Loading />
}

export default AdminLogout
