import React from 'react'
import withStyles from 'react-jss'
import { Button, Icon } from 'semantic-ui-react'

const styles = {
    main: {
        display: 'flex',
        flexWrap: 'nowrap',
        '& button.ui.button': {
            color: 'white',
            backgroundColor: 'inherit'
        }
    }
}

const AppBarMenu = props => {
    const { classes } = props

    return (
        <div className={classes.main}>
            <Button circular icon aria-label="Event">
                <Icon name="block layout" size="large" />
            </Button>
            <Button circular icon aria-label="Event">
                <Icon name="calendar alternate" size="large" />
            </Button>
            <Button circular icon aria-label="Event">
                <Icon name="unordered list" size="large" />
            </Button>
        </div>
    )
}

export default withStyles(styles)(AppBarMenu)