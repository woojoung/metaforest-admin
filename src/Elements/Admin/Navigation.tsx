
import React, { FC, BaseSyntheticEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Indexable } from '../../Base/Type'
import { storage } from '../../Libs/Storage'
import styles from '../../Styles/Style.module.css'

export const AdminNavigation: FC<Indexable> = (props: Indexable): JSX.Element => {
    const [isClicked, setIsClicked] = useState(false)

    const onClickIcon = (evt: BaseSyntheticEvent): void => {
        evt.preventDefault()

        const _isClicked = !isClicked
        setIsClicked(_isClicked)
    }

    const navigate = useNavigate()

    return (
        <ul className={styles.navBox}>
            {/* <Link to='/admin/home'><i className='styles.fas fa-home'></i></Link> */}

            <li className={styles.navList}>
                <div className={styles.dropbtn} onClick={() => navigate('/admin/home')}>홈</div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>기관</div>
                <div className={styles.dropdownContent}>
                    <Link to='/admin/partner/list'>기관 목록</Link>
                    <Link to='/admin/partner/form'>기관 추가</Link>
                </div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>사용자</div>
                <div className={styles.dropdownContent}>
                    <Link to='/admin/user/list'>사용자 목록</Link>
                </div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>관리자</div>
                <div className={styles.dropdownContent}>
                    <Link to='#'>{storage.getString('userId')}</Link>
                    <Link to='/admin/passwd'>비밀번호 변경</Link>
                    <Link to='/admin/logout'>로그아웃</Link>
                    <Link to='/admin/list'>관리자 목록</Link>
                    <Link to='/admin/form'>관리자 추가</Link>
                </div>
            </li>
            {/* <a className='styles.nav-icon' onClick={onClickIcon}>&#9776;</a> */}
        </ul>
    )
}

export default AdminNavigation
