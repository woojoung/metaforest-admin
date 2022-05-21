
import React, { FC, useState, useEffect, BaseSyntheticEvent, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { eApiMessageType } from '../../Enums/ApiMessageType'
import { ApiRequest } from '../../Libs/ApiRequest'
import { xmlHttp } from '../../Libs/XmlHttp'
import { storage } from '../../Libs/Storage'
import { AdminNavigation } from './Navigation'
import { Footer } from '../Common/Footer'
import { Loading } from '../Common/Loading'
import { NoData } from '../Common/NoData'
import { User, Users } from '../../Models/Users'
import { toLocalTimeStr } from '../../Base/Time'
import { adminCheckAuth } from './Auth'
import { cfg } from '../../Base/Config'
import styles from '../../Styles/Style.module.css'
import { text } from '../../Libs/Localization'
import { eAccessLevel } from '../../Enums/AccessLevel'

export const AdminAdminList: FC = (): JSX.Element => {
    // param
    const params = useParams()
    const paramId = params.id ? params.id : ''
    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('관리자 목록')
    const [path1] = useState('admin')
    const [path2] = useState('admin')
    const [id] = useState(paramId)

    const [perPage] = useState(storage.getInteger([path1, path2, 'perPage'].join('_'), 25))
    const [pageNum, setPageNum] = useState(storage.getInteger([path1, path2, 'pageNum'].join('_'), 0))
    const [rows, setRows] = useState([])
    const [nextPage, setNextPage] = useState(false)

    // api
    const apiGetList = (_perPage: number, _pageNum: number): void => {
        

        const apiRequest = new ApiRequest(eApiMessageType.USER_GET_LIST_REQ)
        
        apiRequest.data = {
            limit: _perPage + 1,
            offset: _pageNum
        }

        xmlHttp.request(cfg.apiUrl+'user/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            console.log(apiResponse)
            if (apiResponse.status !== 200) { 
                setRows([])
                setIsLoaded(true)
                return 
            }
            const result = apiResponse.data.rows

            if (result.length > perPage) {
                result.pop()
                setNextPage(true)
            } else {
                setNextPage(false)
            }

            setRows(result)

            storage.setInteger([path1, path2, 'perPage'].join('_'), _perPage)
            storage.setInteger([path1, path2, 'pageNum'].join('_'), _pageNum)

            setIsLoaded(true)
        })
    }

    // event
    const onSubmitForm = (evt: BaseSyntheticEvent): void => {
        evt.preventDefault()

        setPageNum(0)
        apiGetList(perPage, 0)
    }

    const onClickPrevPage = (evt: BaseSyntheticEvent): void => {
        evt.preventDefault()

        const prevPageNum = pageNum - 25
        setPageNum(prevPageNum)
        apiGetList(perPage, prevPageNum)
    }

    const onClickNextPage = (evt: BaseSyntheticEvent): void => {
        evt.preventDefault()

        const nextPageNum = pageNum + 25
        setPageNum(nextPageNum)
        apiGetList(perPage, nextPageNum)
    }

    // effect
    useEffect(() => {
        if (adminCheckAuth() === false) { return }

        apiGetList(perPage, pageNum)
    }, [])

    // render
    if (isLoaded === false) { return <Loading /> }

    const users = new Users()
    const columns = users.columns

    return (
        <Fragment>
            <AdminNavigation admin={{ 'id': adminId, 'accessLevel': adminAccessLevel }} />
            <main className={styles.main1}>
                <h1>{h1}</h1>

                <div className={styles.tableBox}>
                    <table className={styles.table1}>
                        <thead>
                            <tr>
                                {/* {fieldsKeys.map((key, index): JSX.Element => (
                                    <td key={key}>{fieldValues[index].name}</td>
                                ))} */}
                                <th>{'관리자 No'}</th>
                                <th>보기/수정</th>
                                <th>{columns['userNickname'].name}</th>
                                <th>{'관리자ID'}</th>
                                <th>{columns['accessLevel'].name}</th>
                                <th>{columns['createdAt'].name}</th>
                                <th>{columns['updatedAt'].name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row: User): JSX.Element => (
                                <tr key={row.userId}>
                                    <td>{row.userId}</td>
                                    <td><Link className={'link1'} to={`/${path1}/${path2}/form/${row.userId}`}>보기/수정</Link></td>
                                    <td>{row.userNickname}</td>
                                    <td>{row.email}</td>
                                    <td>{text(eAccessLevel[row.accessLevel])}</td>
                                    <td>{toLocalTimeStr(row.createdAt)}</td>
                                    <td>{toLocalTimeStr(row.updatedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {rows.length === 0 && <NoData />}

                <p className={styles.pagination}>
                    {pageNum > 1 ? <span className={styles.a1} onClick={onClickPrevPage}>이전</span> : '이전'}
                    {' | '}
                    {nextPage ? <span className={styles.a1} onClick={onClickNextPage}>다음</span> : '다음'}
                </p>
            </main >
            <Footer />
        </Fragment >
    )
}

export default AdminAdminList
