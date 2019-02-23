import React from 'react'
import withStyles from 'react-jss'
import { Button, Icon } from 'semantic-ui-react'

const styles = {
    views: {
        display: 'flex',
        flexWrap: 'nowrap'
    },
    button: {
        color: 'white',
        backgroundColor: 'inherit'
    }
}

const HeaderViews = props => {
    const { classes } = props

    return (
        <div className={classes.views}>
            <Button
                style={styles.button}
                circular icon aria-label="Event"
            >
                <Icon name="block layout" size="large" />
            </Button>
            <Button
                style={styles.button}
                circular icon aria-label="Event"
            >
                <Icon name="calendar alternate" size="large" />
            </Button>
            <Button
                style={styles.button}
                circular icon aria-label="Event"
            >
                <Icon name="unordered list" size="large" />
            </Button>
        </div>
    )
}

export default withStyles(styles)(HeaderViews)