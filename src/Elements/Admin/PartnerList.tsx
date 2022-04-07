
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
import { Partner, Partners } from '../../Models/Partners'

export const AdminPartnerList: FC = (): JSX.Element => {
    // param
    const params = useParams()
    const paramId = params.id ? params.id : ''
    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('기관 목록')
    const [path1] = useState('admin')
    const [path2] = useState('partner')
    const [id] = useState(paramId)

    const [perPage] = useState(storage.getInteger([path1, path2, 'perPage'].join('_'), 25))
    const [pageNum, setPageNum] = useState(storage.getInteger([path1, path2, 'pageNum'].join('_'), 0))
    const [field1, setField1] = useState(storage.getString([path1, path2, 'field1'].join('_')))
    const [like1, setLike1] = useState(storage.getString([path1, path2, 'like1'].join('_'))=== '' ? 'true' : storage.getString([path1, path2, 'like2'].join('_')))
    const [keyword1, setKeyword1] = useState(storage.getString([path1, path2, 'keyword1'].join('_')))
    const [field2, setField2] = useState(storage.getString([path1, path2, 'field2'].join('_')))
    const [like2, setLike2] = useState(storage.getString([path1, path2, 'like2'].join('_')) === '' ? 'true' : storage.getString([path1, path2, 'like2'].join('_')))
    const [keyword2, setKeyword2] = useState(storage.getString([path1, path2, 'keyword2'].join('_')))
    const [rows, setRows] = useState([])
    const [nextPage, setNextPage] = useState(false)

    // api
    const apiGetList = (_perPage: number, _pageNum: number): void => {
        const conditions = []

        let keywordType1 = 'string'
        let keywordType2 = 'string'
        if (field1 && keyword1) {
            keywordType1 = columns[field1].type
            if (JSON.parse(like1)) {
                conditions.push({field1: keyword1})
            } else {
                if (keywordType1 === 'number') {
                    conditions.push({ field1: Number(keyword1)})
                } else {
                    conditions.push({ field1: keyword1 })
                }
            }
        }
        if (field2 && keyword2) {
            keywordType2 = columns[field2].type
            if (JSON.parse(like2)) {
                conditions.push({field2: keyword2})
            } else {
                if (keywordType2 === 'number') {
                    conditions.push({ field2: Number(keyword2)})
                } else {
                    conditions.push({ field2: keyword2 })
                }
            }
        }

        const apiRequest = new ApiRequest(eApiMessageType.USER_GET_LIST_PARTNER_REQ)
        
        apiRequest.data = {
            limit: _perPage + 1,
            offset: _pageNum,
            conditions: conditions
        }
        xmlHttp.request(cfg.apiUrl+'partner/', apiRequest, (): void => {
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
            storage.setString([path1, path2, 'field2'].join('_'), field2)
            storage.setString([path1, path2, 'like2'].join('_'), like2)
            storage.setString([path1, path2, 'keyword2'].join('_'), keyword2)

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

    const users = new Partners()
    const columns = users.columns

    const fieldsKeys = Object.keys(users.columns)
    const fieldValues = Object.values(users.columns)

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

                        <select className={styles.select2 + ' ' + styles.margin1} value={field2} onChange={(evt: BaseSyntheticEvent): void => setField2(evt.target.value)}>
                            <option value=''>검색2</option>
                            {fieldsKeys.map((key, index): JSX.Element => (
                                <option key={key} value={key}>{fieldValues[index].name}</option>
                            ))}
                        </select>
                        <select className={styles.select3 + ' ' + styles.margin1} value={like2.toString()} onChange={(evt: BaseSyntheticEvent): void => setLike2(evt.target.value)}>
                            <option value='false'>일치</option>
                            <option value='true'>포함</option>
                        </select>
                        <input className={styles.input2 + ' ' + styles.margin1} type='text' size={15} value={keyword2} onChange={(evt: BaseSyntheticEvent): void => setKeyword2(evt.target.value)} />

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
                                <th>{columns['partnerNickname'].name}</th>
                                <th>{columns['code'].name}</th>
                                <th>{columns['plan'].name}</th>
                                <th>{columns['planStartTime'].name}</th>
                                <th>{columns['planExpiryTime'].name}</th>
                                <th>{columns['isApproved'].name}</th>
                                <th>{columns['createdAt'].name}</th>
                                <th>{columns['updatedAt'].name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row: Partner): JSX.Element => (
                                <tr key={row.partnerId}>
                                    <td>{row.partnerId}</td>
                                    <td><Link className={'link1'} to={`/${path1}/${path2}/form/${row.partnerId}`}>보기/수정</Link></td>
                                    <td>{row.partnerNickname}</td>
                                    <td>{row.code}</td>
                                    <td>{row.plan}</td>
                                    <td>{row.planStartTime}</td>
                                    <td>{row.planExpiryTime}</td>
                                    <td>{row.isApproved}</td>
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

export default AdminPartnerList
