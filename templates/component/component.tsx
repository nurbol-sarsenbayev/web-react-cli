import React from 'react'
import { observer } from 'mobx-react'
import translations from './translations'
import { %component%Props } from './props'
import styles from './%component%.scss'

export const %component% = observer((props: %component%Props) => {
    const { store } = props

    return <div className={styles.%component%}>

    </div>
}
