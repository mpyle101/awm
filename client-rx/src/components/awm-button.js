import React from 'react'
import { Button } from 'semantic-ui-react'

import Tooltip from './tooltip'

const AwmButton = props => {
    const { children, tooltip, ...rest } = props
    const trigger = (<Button {...rest}>{children}</Button>)

    if (tooltip) {
        return (
            <Tooltip content={tooltip}>{trigger}</Tooltip>
        )
    } else {
        return trigger
    } 
}

export default AwmButton