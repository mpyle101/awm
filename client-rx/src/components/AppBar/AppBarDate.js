import * as moment from 'moment'

import React from 'react'
import { connect } from 'react-redux'
import withStyles from 'react-jss'

import DateButton from './DateButton'
import TodayButton from './TodayButton'

import { selectDate } from '../../actions'

const styles = {
    dates: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexGrow: 1
    },
    month: {
        marginLeft: '1rem',
        fontFamily: ['"Roboto"', 'sans-serif'],
        fontWeight: 500
    }
}

const AppBarDate = props => {
    const { classes, timestamp, selectDate } = props
    const date = moment(timestamp)

    return (
        <div className={classes.dates}>
            <TodayButton />
            <div>
                <DateButton
                    onClick={() => selectDate(date.subtract(1, 'year'))}
                    icon="angle double left" tooltip="Previous year" />
                <DateButton
                    onClick={() => selectDate(date.subtract(1, 'month'))}
                    icon="angle left" tooltip="Previous month" />
                <DateButton
                    onClick={() => selectDate(date.add(1, 'month'))}
                    icon="angle right" tooltip="Next month" />
                <DateButton
                    onClick={() => selectDate(date.add(1, 'year'))}
                    icon="angle double right" tooltip="Next year" />
            </div>
            <div className={classes.month}>
                {date.format('MMMM YYYY')}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ timestamp: state.selectedDate })
const styled = withStyles(styles)(AppBarDate)
export default connect(
    mapStateToProps,
    { selectDate }
)(styled)