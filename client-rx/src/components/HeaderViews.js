import React from 'react'

import './Header.scss'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'


const HeaderViews = () => {
    return (
        <div className="awm-nav-views">
            <IconButton color="inherit" aria-label="Event">
                <Icon>dashboard</Icon>
            </IconButton>
            <IconButton color="inherit" aria-label="Event">
                <Icon>event</Icon>
            </IconButton>
            <IconButton color="inherit" aria-label="Event">
                <Icon>view_list</Icon>
            </IconButton>
        </div>
    )
}

export default HeaderViews