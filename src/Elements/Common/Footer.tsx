
import React, { FC, useState } from 'react'
import { newTime } from '../../Base/Time'

export const Footer: FC = (): JSX.Element => {
    const [copyrightYear] = useState((newTime()).getFullYear())

    return (
        <footer className='footer1'>
            &copy;{' '}
            <span className='copyright-year'>{copyrightYear}</span>{' '}
            <span className='company-name'>Copyright YATAVENT Corp. All rights reserved.</span>
        </footer>
    )
}

export default Footer
