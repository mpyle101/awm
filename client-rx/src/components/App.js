import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Header from './Header'

const styles = {
    root: {
        height: '100vh',
        display: 'grid',
        grid: '3rem auto 2rem / auto',
        gridTemplateAreas: '"header" "content" "footer"'
    },
    header: {
        gridArea: 'header'
    },
    content: {
        gridArea: 'content',
        overflow: 'auto',
        '& div': {
            height: '1000px'
        }
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
            <Header className={classes.header}/>
            <div className={classes.content}>
                <div>CONTENT</div>
            </div>
            <div className={classes.footer}></div>
        </div>
    )
}

export default withStyles(styles)(App)