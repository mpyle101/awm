import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import withStyles from 'react-jss'

import Tooltip from '../tooltip'
import AppBarDate from './appbar-date'
import AppBarMenu from './appbar-menu'

const styles = {
    header: {
        color: 'white',
        backgroundColor: '#3f51b5',
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    menu: {
        color: 'white',
        backgroundColor: '#3f51b5',
        marginRight: '1rem'
    },
    title: {
        color: 'inherit',
        marginRight: '1rem',
        fontFamily: ['"Roboto"', 'sans-serif'],
        fontSize: '1.25rem',
        fontWeight: 500
    }
}

const AppBar = props => {
    const { classes } = props

    return (
        <div className={classes.header}>
            <Button style={styles.menu} circular icon>
                <Icon name="sidebar" size="large" />
            </Button>
            <Tooltip content="Awesome Workout Manager">
                <div className={classes.title}>AWM</div>
            </Tooltip>
            <AppBarDate />
            <AppBarMenu />
        </div>
    )
}

export default withStyles(styles)(AppBar)