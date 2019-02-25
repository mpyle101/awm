import React from 'react'
import { connect } from 'react-redux'
import * as moment from "moment"

import AwmButton from '../AwmButton'
import { selectDate } from '../../actions'

const TODAY = moment().format('dddd, MMMM Do YYYY')

const styles = {
    color: 'white',
    backgroundColor: 'inherit',
    fontFamily: ['"Roboto"', 'sans-serif'],
    fontWeight: 500
}

const TodayButton = props => {
    return (
        <AwmButton
            style={styles}
            tooltip={TODAY}
            onClick={() => props.selectDate()}
        >
            Today
        </AwmButton>
    )
}

export default connect(null, { selectDate })(TodayButton)