import * as moment from 'moment'
import 'moment-duration-format'

import React from 'react'
import withStyles from 'react-jss'
import { Popup } from 'semantic-ui-react'

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

const formatReps = reps => Array.isArray(reps) ? `[${reps.join(",")}]` : reps
const formatSet  = (item, set) => {
    const reps = formatReps(set.reps)
    return `${item.key}: ${set.count}x${reps}@${set.wt}`
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

        case 'MS':
            return (
                <Popup trigger={<div>MS</div>}>
                    {work.map(item => (
                        <div key={item.key}>
                            {item.sets.map((set, idx) => (
                                <div key={item.key + idx}>
                                    {formatSet(item, set)}
                                </div>
                            ))}
                        </div>
                    ))}
                </Popup>
            )

        default:
            return <div>{category}</div>
    }
}

export default withStyles(styles)(Block)
