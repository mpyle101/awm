import React from 'react'
import { connect } from 'react-redux'
import * as moment from "moment"

import AwmButton from '../awm-button'
import { selectDate } from '../../actions'

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
            tooltip={moment().format('dddd, MMMM Do YYYY')}
            onClick={() => props.selectDate(moment(), props.period)}
        >
            Today
        </AwmButton>
    )
}

const mapStateToProps = state => ({
    period: state.period
})

export default connect(
    mapStateToProps,
    { selectDate }
)(TodayButton)