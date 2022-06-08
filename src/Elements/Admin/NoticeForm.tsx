
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
import { nowStr, toLocalTimeStr } from '../../Base/Time'
import { Notices } from '../../Models/Notices'
import { Editor } from '@tinymce/tinymce-react'
import { Any } from '../../Base/Type'

export const AdminNoticeForm: FC = (): JSX.Element => {
    // param
    const params = useParams()
    const navigate = useNavigate()

    const paramId = params.id ? params.id : ''

    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('공지사항')
    const [path1] = useState('admin')
    const [path2] = useState('notice')
    const [id, setId] = useState(Number(paramId))
    const [inputColor, setInputColor] = useState({ backgroundColor: 'white' })

    const [ordering, setOrdering] = useState(1)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isApproved, setIsApproved] = useState('N')
    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')

    let _isContentChanged = false
    let _content = ''
    const handleEditorChange = (_editorContent: string, editor: Any) => {
        _content = _editorContent
        _isContentChanged = true

        console.log(typeof editor)
    }

    // api
    const apiGetOne = (): void => {
        if (paramId === '') { 
            setId(Number(paramId))
            setOrdering(0)
            setTitle('')
            setContent('')
            setIsApproved('N')
            setCreatedAt('')
            setUpdatedAt('')
            setIsLoaded(true)
            return 
        }

        setInputColor({ backgroundColor: 'lightgray' })

        const apiRequest = new ApiRequest(eApiMessageType.ADMIN_GET_ONE_NOTICE_REQ)
        apiRequest.data = {
            noticeId: id,
        }
        xmlHttp.request(cfg.apiUrl+'admin/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            // console.log(apiResponse)
            if (apiResponse.status !== eHttpStatus.OK) { return }

            const row = apiResponse.data.rows
            // console.log(row)
            setId(row.noticeId)

            setOrdering(row.ordering)
            setTitle(row.title)
            setContent(row.content)
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
        apiRequest.msgType = (paramId === '') ? eApiMessageType.ADMIN_CREATE_NOTICE_REQ : eApiMessageType.ADMIN_UPDATE_NOTICE_REQ

        if (paramId !== '' && _isContentChanged === false) {
            handleEditorChange(content, null)
        }

        apiRequest.data = {
            noticeId: id,
            ordering: ordering,
            title: title,
            content: _content,
            isApproved: isApproved
        }

        if (paramId !== '') {
            apiRequest.data.updatedAt = nowStr() 
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

    const notices = new Notices()
    const column = notices.columns

    return (
        <Fragment>
            <AdminNavigation admin={{ 'id': adminId, 'accessLevel': adminAccessLevel }} />
            <main className={styles.main1}>
                <h1>{h1}</h1>

                <div>
                    <form className={styles.form1} onSubmit={onSubmitForm}>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['noticeId'].name}</label>
                            <input className={styles.form1Input1} type='text' value={id} readOnly={true} style={{ backgroundColor: 'lightgray' }} onChange={(evt: BaseSyntheticEvent): void => setId(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['ordering'].name}</label>
                            <input className={styles.form1Input1} type='text' value={ordering} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setOrdering(evt.target.value)} /></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['title'].name}</label>
                            <input className={styles.form1Input1} type='text' value={title} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setTitle(evt.target.value)} /></p>
                        
                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['isApproved'].name}</label>
                            <select value={isApproved} onChange={(evt: BaseSyntheticEvent): void => setIsApproved(evt.target.value)}>
                                <option key={'N'} value={'N'}>{'미승인'}</option>
                                <option key={'Y'} value={'Y'}>{'승인'}</option>
                            </select></p>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['content'].name}</label>
                            <Editor
                                    apiKey={'1fmpc24j5xq66xb3nmfijvrl614iwmfmcektko3okxgzfbyw'}
                                    initialValue={content}
                                    init={{
                                        height: 600,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image anchor',
                                            'visualblocks code fullscreen',
                                            'paste help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | fontsizeselect | bold italic forecolor backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | image removeformat | code fullscreen help'
                                    }}
                                    onEditorChange={handleEditorChange} /></p>
                        
                        

                        <hr />
                        <input className={styles.btnSubmit1} type='submit' value='확인' />
                    </form>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}

export default AdminNoticeForm
