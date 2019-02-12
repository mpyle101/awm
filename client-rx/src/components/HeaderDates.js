import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typeography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core';

import {
    selectToday,
    selectNextMonth,
    selectPrevMonth,
    selectNextYear,
    selectPrevYear
} from '../actions'

const styles = {
    dates: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    month: {
        marginLeft: '1rem'
    }
}

class HeaderDates extends Component {
    render() {
        const { classes, date } = this.props

        return (
            <div className={classes.dates}>
                <Button onClick={this.props.selectToday} color="inherit">Today</Button>
                <IconButton onClick={this.props.selectPrevYear} color="inherit">
                    <Icon>fast_rewind</Icon>
                </IconButton>
                <IconButton onClick={this.props.selectPrevMonth} color="inherit">
                    <Icon>navigate_before</Icon>
                </IconButton>
                <IconButton onClick={this.props.selectNextMonth} color="inherit">
                    <Icon>navigate_next</Icon>
                </IconButton>
                <IconButton onClick={this.props.selectNextYear} color="inherit">
                    <Icon>fast_forward</Icon>
                </IconButton>
                <div className={classes.month}>
                    <Typeography color="inherit">
                        {date.format('MMMM YYYY')}
                    </Typeography>
                </div>
            </div>
        )
    } 
}

const mapStateToProps = state => ({ date: state.selectedDate })

const actions = {
    selectToday,
    selectNextMonth,
    selectPrevMonth,
    selectNextYear,
    selectPrevYear
}

const styled = withStyles(styles)(HeaderDates)
export default connect(mapStateToProps, actions)(styled)