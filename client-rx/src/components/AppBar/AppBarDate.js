import React from 'react'
import { connect } from 'react-redux'
import withStyles from 'react-jss'

import DateButton from './DateButton'
import TodayButton from './TodayButton'

import { selectNextDate, selectPrevDate } from '../../actions'

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
    const { 
        classes,
        date, 
        selectNextDate,
        selectPrevDate
    } = props

    return (
        <div className={classes.dates}>
            <TodayButton />
            <div>
                <DateButton
                    onClick={() => selectPrevDate('year')}
                    icon="angle double left" tooltip="Previous year" />
                <DateButton
                    onClick={() => selectPrevDate('month')}
                    icon="angle left" tooltip="Previous month" />
                <DateButton
                    onClick={() => selectNextDate('month')}
                    icon="angle right" tooltip="Next month" />
                <DateButton
                    onClick={() => selectNextDate('year')}
                    icon="angle double right" tooltip="Next year" />
            </div>
            <div className={classes.month}>
                {date.format('MMMM YYYY')}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ date: state.selectedDate })

const actions = {
    selectNextDate,
    selectPrevDate
}

const styled = withStyles(styles)(AppBarDate)
export default connect(mapStateToProps, actions)(styled)