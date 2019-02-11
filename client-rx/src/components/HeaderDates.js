import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Header.scss'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typeography from '@material-ui/core/Typography'

import {
    selectToday,
    selectNextMonth,
    selectPrevMonth,
    selectNextYear,
    selectPrevYear
} from '../actions'

class HeaderDates extends Component {
    render() {
        const date = this.props.date.format('MMMM YYYY')

        return (
            <div className="awm-nav-dates">
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
                <div className="awm-nav-month">
                    <Typeography color="inherit">
                        {date}
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

export default connect(mapStateToProps, actions)(HeaderDates)