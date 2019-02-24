import React from 'react'
import withStyles from 'react-jss'

import AppBar from './AppBar'
import Dashboard from './Dashboard'

const styles = {
    root: {
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
        backgroundColor: '#3f51b5',
        gridArea: 'footer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

const App = props => {
    const { classes } = props

    return (
        <div className={classes.root}>
            <AppBar className={classes.header}/>
            <main className={classes.main}>
                <Dashboard />
            </main>
            <footer className={classes.footer}></footer>
        </div>
    )
}

export default withStyles(styles)(App)