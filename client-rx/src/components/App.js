import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Header from './Header'

const styles = {
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flexGrow: 1
    }
}

const App = props => {
    const { classes } = props

    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.content}>Content</div>
            <div>Footer</div>
        </div>
    )
}

export default withStyles(styles)(App)