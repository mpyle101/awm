import * as moment from 'moment'

import React from 'react'
import { connect } from 'react-redux'
import withStyles from 'react-jss'

import { Dropdown } from 'semantic-ui-react'
import DateButton from './date-button'
import TodayButton from './today-button'

import { selectDate, selectPeriod } from '../../actions'

const styles = {
    dates: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexGrow: 1
    },
    period: {
        color: 'white',
        backgroundColor: 'inherit',
        marginLeft: '1rem',
        fontFamily: ['"Roboto"', 'sans-serif'],
        fontWeight: 500
    }
}

const periods = [
    {text: '30 Days', value: 30},
    {text: '60 Days', value: 60},
    {text: '90 Days', value: 90}
]

const AppBarDate = props => {
    const { classes, period, date, selectDate, selectPeriod } = props

    return (
        <div className={classes.dates}>
            <TodayButton />
            <div>
                <DateButton
                    onClick={() => selectDate(date.subtract(1, 'year'), period)}
                    icon="angle double left" tooltip="Previous year" />
                <DateButton
                    onClick={() => selectDate(date.subtract(1, 'month'), period)}
                    icon="angle left" tooltip="Previous month" />
                <DateButton
                    onClick={() => selectDate(date.add(1, 'month'), period)}
                    icon="angle right" tooltip="Next month" />
                <DateButton
                    onClick={() => selectDate(date.add(1, 'year'), period)}
                    icon="angle double right" tooltip="Next year" />
            </div>
            <Dropdown
                style={styles.period}
                selection compact
                options={periods}
                value={period}
                onChange={(e, d) => selectPeriod(date, d.value)}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    period: state.period,
    date: moment(state.selectedDate)
})
const styled = withStyles(styles)(AppBarDate)
export default connect(
    mapStateToProps,
    { selectDate, selectPeriod }
)(styled)