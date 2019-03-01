import * as moment from 'moment'
import 'moment-duration-format'

import React from 'react'
import withStyles from 'react-jss'

const styles = {
    cell: {
        display: 'flex'
    },
    item: {
        paddingRight: '5px'
    }
}

const duration = period => {
    const d = moment.duration(period)
    return d.format(() => d.asMinutes() > 59 ? 'h:mm' : 'm[m]')
}

const Block = props => {
    const { classes, block } = props
    const { category, key, work, meta } = block

    switch (category) {
        case 'GC':
        case 'EN':
        case 'HGC':
            return (
                <div className={classes.cell}>
                    <div className={classes.item}>{category}:</div>
                    <div className={classes.item}>{duration(work)}</div>
                    <div>{key} - {meta}</div>
                </div>
            )

        case 'FBT':
            return (
                <div className={classes.cell}>
                    <div className={classes.item}>{category}:</div>
                    <div className={classes.item}>{duration(work)}</div>
                    <div>{meta}</div>
                </div>
            )

        default:
            return <div>{category}</div>
    }
}

export default withStyles(styles)(Block)
