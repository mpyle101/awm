import React from 'react'

import './Header.scss'

import AppBar from '@material-ui/core/AppBar'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typeography from '@material-ui/core/Typography'

import HeaderDates from './HeaderDates'
import HeaderViews from './HeaderViews'

const Header = () => {
    return (
        <div>
            <AppBar>
                <Toolbar className="awm-nav-tools">
                    <IconButton id="awm-nav-menu" color="inherit" aria-label="Menu">
                        <Icon>menu</Icon>
                    </IconButton>
                    <Typeography className="awm-nav-title" variant="h6" color="inherit">
                        AWM
                    </Typeography>
                    <HeaderDates />
                    <HeaderViews />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header