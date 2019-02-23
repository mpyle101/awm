import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import withStyles from 'react-jss'

import HeaderDates from './HeaderDates'
import HeaderViews from './HeaderViews'

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

const Header = props => {
    const { classes } = props

    return (
        <div className={classes.header}>
            <Button style={styles.menu} circular icon>
                <Icon name="sidebar" size="large" />
            </Button>
            <div className={classes.title}>AWM</div>
            <HeaderDates />
            <HeaderViews />
        </div>
    )
}

export default withStyles(styles)(Header)