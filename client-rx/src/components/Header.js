import React from 'react'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typeography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import HeaderDates from './HeaderDates'
import HeaderViews from './HeaderViews'

const styles = theme => ({
    header: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
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
})

const Header = props => {
    const { menu, title, header } = props.classes

    return (
        <div className={header}>
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