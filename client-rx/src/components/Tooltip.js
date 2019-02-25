import React from 'react'
import { Popup } from 'semantic-ui-react'

const Tooltip = props => {
    return (
        <Popup
            trigger={props.children}
            content={props.content}
            style={{ opacity: 0.7 }}
            inverted
        />
    )
}

export default Tooltip