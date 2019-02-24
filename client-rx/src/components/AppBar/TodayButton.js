import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { selectDate } from '../../actions'

const styles = {
    color: 'white',
    backgroundColor: 'inherit',
    fontFamily: ['"Roboto"', 'sans-serif'],
    fontWeight: 500
}

const TodayButton = props => {
    return (
        <Button style={styles} onClick={() => props.selectDate()}>
            Today
        </Button>
    )
}

export default connect(null, { selectDate })(TodayButton)