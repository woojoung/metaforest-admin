
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
import { toLocalTimeStr } from '../../Base/Time'
import { adminCheckAuth } from './Auth'
import { cfg } from '../../Base/Config'
import styles from '../../Styles/Style.module.css'
import { Notice, Notices } from '../../Models/Notices'
import { eHttpStatus } from '../../Enums/HttpStatus'

export const AdminNoticeList: FC = (): JSX.Element => {
    // param
    const params = useParams()
    const paramId = params.id ? params.id : ''
    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('공지사항 목록')
    const [path1] = useState('admin')
    const [path2] = useState('notice')
    const [id] = useState(paramId)

    const [perPage] = useState(storage.getInteger([path1, path2, 'perPage'].join('_'), 25))
    const [pageNum, setPageNum] = useState(storage.getInteger([path1, path2, 'pageNum'].join('_'), 0))
    const [field1, setField1] = useState(storage.getString([path1, path2, 'field1'].join('_')))
    const [like1, setLike1] = useState(storage.getString([path1, path2, 'like1'].join('_') )=== '' ? 'true' : 'false')
    const [keyword1, setKeyword1] = useState(storage.getString([path1, path2, 'keyword1'].join('_')))
    const [orderBy, setOrderBy] = useState(storage.getString([path1, path2, 'orderBy'].join('_')))
    const [isAsc, setIsAsc] = useState(storage.getString([path1, path2, 'isAsc'].join('_')) === '' ? 'DESC' : 'ASC')
    const [rows, setRows] = useState([])
    const [nextPage, setNextPage] = useState(false)

    // api
    const apiGetList = (_perPage: number, _pageNum: number): void => {

        const apiRequest = new ApiRequest(eApiMessageType.ADMIN_GET_LIST_NOTICE_REQ)
        
        apiRequest.data = {
            limit: _perPage + 1,
            offset: _pageNum,
            keyword1: keyword1,
            like1: like1,
            field1: field1,
            orderBy: orderBy,
            isAsc: isAsc,

        }
        xmlHttp.request(cfg.apiUrl+'admin/', apiRequest, (): void => {
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
            storage.setString([path1, path2, 'field1'].join('_'), field1)
            storage.setString([path1, path2, 'like1'].join('_'), like1)
            storage.setString([path1, path2, 'keyword1'].join('_'), keyword1)
            storage.setString([path1, path2, 'orderBy'].join('_'), orderBy)
            storage.setString([path1, path2, 'isAsc'].join('_'), isAsc)

            setIsLoaded(true)
        })
    }

    const apiDelete = (id: number): void => {
        const apiRequest = new ApiRequest(eApiMessageType.ADMIN_DELETE_NOTICE_REQ)
        apiRequest.data = {
            noticeId: id
        }

        xmlHttp.request(cfg.apiUrl+'admin/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            if (apiResponse.status !== eHttpStatus.OK) { return }

            alert('삭제하였습니다.')
            apiGetList(perPage, pageNum)
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

    // sub component
    const Delete: FC<{ id?: number }> = (props: { id?: number }): JSX.Element => {
        const onClickDelete = (evt: BaseSyntheticEvent): void => {
            evt.preventDefault()

            props.id && apiDelete(props.id)
        }

        return (
            <span className={styles.a1} onClick={onClickDelete}>삭제</span>
        )
    }

    // effect
    useEffect(() => {
        if (adminCheckAuth() === false) { return }

        apiGetList(perPage, pageNum)
    }, [])

    // render
    if (isLoaded === false) { return <Loading /> }

    const notices = new Notices()
    const columns = notices.columns

    const fieldsKeys = Object.keys(notices.columns)
    const index = fieldsKeys.indexOf('content')

    const fieldValues = Object.values(notices.columns)

    fieldsKeys.splice(index, 1)
    fieldValues.splice(index, 1)

    return (
        <Fragment>
            <AdminNavigation admin={{ 'id': adminId, 'accessLevel': adminAccessLevel }} />
            <main className={styles.main1}>
                <h1>{h1}</h1>
                {paramId === '' &&
                    <form className={styles.form1Search} onSubmit={onSubmitForm}>
                        <select className={styles.select2 + ' ' + styles.margin1} value={field1} onChange={(evt: BaseSyntheticEvent): void => setField1(evt.target.value)}>
                            <option value=''>검색1</option>
                            {fieldsKeys.map((key, index): JSX.Element => (
                                <option key={key} value={key}>{fieldValues[index].name}</option>
                            ))}
                        </select>
                        <select className={styles.select3 + ' ' + styles.margin1} value={like1.toString()} onChange={(evt: BaseSyntheticEvent): void => setLike1(evt.target.value)}>
                            <option value='false'>일치</option>
                            <option value='true'>포함</option>
                        </select>
                        <input className={styles.input2 + ' ' + styles.margin1} size={15} type='text' value={keyword1} onChange={(evt: BaseSyntheticEvent): void => setKeyword1(evt.target.value)} />

                        <select className={styles.select2 + ' ' + styles.margin1} value={orderBy} onChange={(evt: BaseSyntheticEvent): void => setOrderBy(evt.target.value)}>
                            <option value=''>정렬</option>
                            {fieldsKeys.map((key, index): JSX.Element => (
                                <option key={key} value={key}>{fieldValues[index].name}</option>
                            ))}
                        </select>

                        <select  className={styles.select3 + ' ' + styles.margin1} value={isAsc.toString()} onChange={(evt: BaseSyntheticEvent): void => setIsAsc(evt.target.value)}>
                            <option value='DESC'>내림차순</option>
                            <option value='ASC'>오름차순</option>
                        </select>

                        <input className={styles.btnSubmit1} type='submit' value='확인' />
                    </form >
                }


                <div className={styles.tableBox}>
                    <table className={styles.table1}>
                        <thead>
                            <tr>
                                {/* {fieldsKeys.map((key, index): JSX.Element => (
                                    <td key={key}>{fieldValues[index].name}</td>
                                ))} */}
                                <th>{columns['partnerId'].name}</th>
                                <th>보기/수정</th>
                                {fieldsKeys.map((key, index): JSX.Element => (
                                    <th key={key}>{fieldValues[index].name}</th>
                                ))}
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row: Notice): JSX.Element => (
                                <tr key={row.noticeId}>
                                    <td><Link className={'link1'} to={`/${path1}/${path2}/form/${row.noticeId}`}>보기/수정</Link></td>
                                    <td>{row.noticeId}</td>
                                    <td>
                                        {row.ordering === -1 && '최상단고정'}
                                        {row.ordering === -10000 && '상단고정'}
                                        {row.ordering === 1 && '상단고정 안함'}
                                    </td>
                                    <td>{row.title}</td>
                                    <td>{row.adminId}</td>
                                    <td>{row.isApproved === 'Y' ? '승인' : '미승인'}</td>
                                    <td>{toLocalTimeStr(row.createdAt)}</td>
                                    <td>{toLocalTimeStr(row.updatedAt)}</td>
                                    <td><Delete id={row.noticeId} /></td>
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

export default AdminNoticeList
