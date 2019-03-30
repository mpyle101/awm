import React from 'react'
import { Icon } from 'semantic-ui-react'

import AwmButton from '../awm-button'

const styles = {
    color: 'white',
    backgroundColor: 'inherit',
    fontFamily: ['"Roboto"', 'sans-serif'],
    fontWeight: 500
}

export default props => {
    const { onClick, icon, tooltip } = props

    return (
        <AwmButton
            tooltip={tooltip}
            style={styles}
            onClick={onClick}
            circular icon
        >
            <Icon className={icon} size="large" />
        </AwmButton>
    )
}
