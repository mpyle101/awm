import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typeography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import HeaderDates from './HeaderDates'
import HeaderViews from './HeaderViews'

const styles = {
    tools: {
        display: 'flex',
        'flex-wrap': 'nowrap',
        'justify-content': 'space-between'
    },
    menu: {
        'margin-right': '1rem'
    },
    title: {
        'margin-right': '1rem'
    }
}

const Header = props => {
    console.log(props)
    const { menu, title, tools } = props.classes

    return (
        <div>
            <AppBar>
                <Toolbar className={tools}>
                    <IconButton className={menu} color="inherit" aria-label="Menu">
                        <Icon>menu</Icon>
                    </IconButton>
                    <Typeography className={title} variant="h6" color="inherit">
                        AWM
                    </Typeography>
                    <HeaderDates />
                    <HeaderViews />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(styles)(Header)