import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const styles = {
    color: 'white',
    backgroundColor: 'inherit',
    fontFamily: ['"Roboto"', 'sans-serif'],
    fontWeight: 500
}

export default props => {
    const { onClick, icon } = props

    return (
        <Button style={styles} onClick={onClick} circular icon>
            <Icon name={icon} size="large" />
        </Button>
    )
}
