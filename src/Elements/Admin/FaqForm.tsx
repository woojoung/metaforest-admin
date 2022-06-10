
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
import { Faqs } from '../../Models/Faqs'
import { Editor } from '@tinymce/tinymce-react'
import { Any } from '../../Base/Type'
import { eFaqCategory } from '../../Enums/FaqCategory'
import { eAccessLevel } from '../../Enums/AccessLevel'

export const AdminFaqForm: FC = (): JSX.Element => {
    // param
    const params = useParams()
    const navigate = useNavigate()

    const paramId = params.id ? params.id : ''

    // state
    const [adminId] = useState(storage.getString('adminId', ''))
    const [adminAccessLevel] = useState(storage.getInteger('adminAccessLevel', 0))

    const [isLoaded, setIsLoaded] = useState(false)
    const [h1] = useState('FAQ')
    const [path1] = useState('admin')
    const [path2] = useState('faq')
    const [id, setId] = useState(Number(paramId))
    const [inputColor, setInputColor] = useState({ backgroundColor: 'white' })

    const [ordering, setOrdering] = useState(1)
    const [category, setCategory] = useState(eFaqCategory.NONE)
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
            setCategory(0)
            setTitle('')
            setContent('')
            setIsApproved('N')
            setCreatedAt('')
            setUpdatedAt('')
            setIsLoaded(true)
            return 
        }

        setInputColor({ backgroundColor: 'lightgray' })

        const apiRequest = new ApiRequest(eApiMessageType.ADMIN_GET_ONE_FAQ_REQ)
        apiRequest.data = {
            faqId: id,
        }
        xmlHttp.request(cfg.apiUrl+'admin/', apiRequest, (): void => {
            const apiResponse = xmlHttp.parseResponse()
            // console.log(apiResponse)
            if (apiResponse.status !== eHttpStatus.OK) { return }

            const row = apiResponse.data.rows
            // console.log(row)
            setId(row.faqId)

            setOrdering(row.ordering)
            setCategory(row.category)
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
        apiRequest.msgType = (paramId === '') ? eApiMessageType.ADMIN_CREATE_FAQ_REQ : eApiMessageType.ADMIN_UPDATE_FAQ_REQ

        if (paramId !== '' && _isContentChanged === false) {
            handleEditorChange(content, null)
        }

        apiRequest.data = {
            faqId: id,
            ordering: ordering,
            category: category,
            title: title,
            content: _content,
            adminId: adminId,
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

    const faqs = new Faqs()
    const column = faqs.columns

    return (
        <Fragment>
            <AdminNavigation admin={{ 'id': adminId, 'accessLevel': adminAccessLevel }} />
            <main className={styles.main1}>
                <h1>{h1}</h1>

                <div>
                    <form className={styles.form1} onSubmit={onSubmitForm}>

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['faqId'].name}</label>
                            <input className={styles.form1Input1} type='text' value={id} readOnly={true} style={{ backgroundColor: 'lightgray' }} onChange={(evt: BaseSyntheticEvent): void => setId(evt.target.value)} /></p>

                        {/* <p className={styles.p1}><label className={styles.Form1Label1}>{column['ordering'].name}</label>
                            <input className={styles.form1Input1} type='text' value={ordering} readOnly={false} style={inputColor} onChange={(evt: BaseSyntheticEvent): void => setOrdering(evt.target.value)} /></p> */}

                        <p className={styles.p1}><label className={styles.Form1Label1}>{column['category'].name}</label>
                            <select value={category} onChange={(evt: BaseSyntheticEvent): void => setCategory(evt.target.value)}>
                                <option key={eFaqCategory.NONE} value={eFaqCategory.NONE}>{'선택'}</option>
                                <option key={eFaqCategory.PROGRAM_USAGE} value={eFaqCategory.PROGRAM_USAGE}>{'프로그램 사용'}</option>
                                <option key={eFaqCategory.COUNSELING} value={eFaqCategory.COUNSELING}>{'심리 상담'}</option>
                                <option key={eFaqCategory.PARTNER_REGISTRATION} value={eFaqCategory.PARTNER_REGISTRATION}>{'기관 등록'}</option>
                                <option key={eFaqCategory.MEMBERSHIP} value={eFaqCategory.MEMBERSHIP}>{'회원관리'}</option>
                                <option key={eFaqCategory.ETC} value={eFaqCategory.ETC}>{'기타'}</option>
                            </select>
                        </p>

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

export default AdminFaqForm
