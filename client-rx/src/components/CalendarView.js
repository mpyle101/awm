import React from 'react'
import withStyles from 'react-jss'

import Header from './Header'

const styles = theme => ({
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
        backgroundColor: theme.palette.primary.main,
        gridArea: 'footer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const App = props => {
    const { classes } = props

    return (
        <div className={classes.root}>
            <Header className={classes.header}/>
            <main className={classes.content}>
                <div>CONTENT</div>
            </main>
            <footer className={classes.footer}></footer>
        </div>
    )
}

export default withStyles(styles)(App)