import React from 'react'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typeography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import HeaderDates from './HeaderDates'
import HeaderViews from './HeaderViews'

const styles = {
    tools: {
        color: 'white',
        backgroundColor: '#3f51b5',
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    menu: {
        marginRight: '1rem'
    },
    title: {
        marginRight: '1rem'
    }
}

const Header = props => {
    console.log(props)
    const { menu, title, tools } = props.classes

    return (
        <div className={tools}>
            <IconButton className={menu} color="inherit" aria-label="Menu">
                <Icon>menu</Icon>
            </IconButton>
            <Typeography className={title} variant="h6" color="inherit">
                AWM
            </Typeography>
            <HeaderDates />
            <HeaderViews />
        </div>
    )
}

export default withStyles(styles)(Header)