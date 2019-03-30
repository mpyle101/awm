import React, { useEffect } from 'react'
import withStyles from 'react-jss'
import { connect } from 'react-redux'

import * as moment from "moment"
import { selectDate } from '../actions'

import AppBar from './appbar'
import Footer from './footer'
import Dashboard from './dashboard'

const styles = {
    root: {
        fontFamily: ['"Roboto"', 'sans-serif'],
        height: '100vh',
        display: 'grid',
        gridTemplate: '3rem auto 2rem / auto',
        gridTemplateAreas: '"header" "main" "footer"'
    },
    header: {
        gridArea: 'header'
    },
    main: {
        gridArea: 'main',
        overflow: 'auto'
    },
    footer: {
        gridArea: 'footer',
    }
}

const App = props => {
    const { classes } = props

    useEffect(() => { props.selectDate(moment(), 90) }, [])

    return (
        <div className={classes.root}>
            <AppBar className={classes.header}/>
            <main className={classes.main}>
                <Dashboard />
            </main>
            <Footer className={classes.footer}/>
        </div>
    )
}

const styled = withStyles(styles)(App)
export default connect(null, { selectDate })(styled)