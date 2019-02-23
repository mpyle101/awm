import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from 'react-jss'
import { Button, Icon } from 'semantic-ui-react'

import {
    selectDate,
    selectNextDate,
    selectPrevDate
} from '../actions'

const styles = {
    dates: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexGrow: 1
    },
    button: {
        color: 'white',
        backgroundColor: 'inherit',
        fontFamily: ['"Roboto"', 'sans-serif'],
        fontWeight: 500
    },
    month: {
        marginLeft: '1rem',
        fontFamily: ['"Roboto"', 'sans-serif'],
        fontWeight: 500
    }
}

class HeaderDates extends Component {
    render() {
        const { 
            classes, date, 
            selectDate, selectNextDate, selectPrevDate
        } = this.props

        return (
            <div className={classes.dates}>
                <Button
                    style={styles.button} 
                    onClick={() => selectDate()}
                >Today</Button>
                <div>
                    <Button
                        style={styles.button}
                        onClick={() => selectPrevDate('year')}
                        circular icon
                    >
                        <Icon name="angle double left" size="large" />
                    </Button>
                    <Button
                        style={styles.button}
                        onClick={() => selectPrevDate('month')}
                        circular icon
                    >
                        <Icon name="angle left" size="large" />
                    </Button>
                    <Button
                        style={styles.button}
                        onClick={() => selectNextDate('month')}
                        circular icon
                    >
                        <Icon name="angle right" size="large" />
                    </Button>
                    <Button
                        style={styles.button}
                        onClick={() => selectNextDate('year')}
                        circular icon
                    >
                        <Icon name="angle double right" size="large" />
                    </Button>
                </div>
                <div className={classes.month}>
                    {date.format('MMMM YYYY')}
                </div>
            </div>
        )
    } 
}

const mapStateToProps = state => ({ date: state.selectedDate })

const actions = {
    selectDate,
    selectNextDate,
    selectPrevDate
}

const styled = withStyles(styles)(HeaderDates)
export default connect(mapStateToProps, actions)(styled)