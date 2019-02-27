import React, { useEffect } from 'react'
import withStyles from 'react-jss'
import { connect } from 'react-redux'

import { selectDate } from '../actions'

import AppBar from './AppBar'
import Dashboard from './Dashboard'

const styles = {
    root: {
        height: '100vh',
        display: 'grid',
        gridTemplate: '3rem auto / auto',
        gridTemplateAreas: '"header" "main"'
    },
    header: {
        gridArea: 'header'
    },
    main: {
        gridArea: 'main',
        overflow: 'auto'
    },
    footer: {
        backgroundColor: '#3f51b5',
        gridArea: 'footer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

const App = props => {
    const { classes } = props

    useEffect(() => { props.selectDate() }, [])

    return (
        <div className={classes.root}>
            <AppBar className={classes.header}/>
            <main className={classes.main}>
                <Dashboard />
            </main>
        </div>
    )
}

const styled = withStyles(styles)(App)
export default connect(null, { selectDate })(styled)