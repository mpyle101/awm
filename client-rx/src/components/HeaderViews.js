import React from 'react'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    views: {
        display: 'flex',
        flexWrap: 'nowrap'
    }
}

const HeaderViews = props => {
    const { classes } = props

    return (
        <div className={classes.views}>
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

export default withStyles(styles)(HeaderViews)