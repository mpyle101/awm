import * as moment from 'moment'

import React from 'react'
import withStyles from 'react-jss'
import { connect } from 'react-redux'

const styles = {
    footer: {
        backgroundColor: '#3f51b5',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    to: {
        marginLeft: '1rem',
        marginRight: '1rem'
    }
}


const Footer = props => {
    const { classes, workouts } = props

    if (workouts.length) {
        const first = moment(workouts[0].date)
        const last  = moment(workouts[workouts.length - 1].date)

        return (
            <div className={classes.footer}>
                <div>{last.format('MMMM Do, YYYY')}</div>
                <div className={classes.to}>to</div>
                <div>{first.format('MMMM Do, YYYY')}</div>
            </div>
        )
    } else {
        return <div></div>
    }
}

const mapStateToProps = state => ({
    workouts: state.workouts.items
})

const styled = withStyles(styles)(Footer)
export default connect(mapStateToProps)(styled)