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
        paddingRight: '0.5rem'
    }
}

const duration = period => {
    const d = moment.duration(period)
    return d.format(() => d.asMinutes() > 59 ? 'h:mm' : 'm[m]')
}

const formatReps = reps => Array.isArray(reps) ? `[${reps.join(",")}]` : reps
const formatSet  = (item, set, idx) => {
    const style = item.style === 'EMOM' ? ' (EMOM)' : ''
    const reps = formatReps(set.reps)
    if (set.wt) {
        return `${item.key}${style}: ${set.count}x${reps}@${set.wt}${set.unit.toLowerCase()}`
    } else {
        return `${item.key}${style}: ${set.count}x${reps}`
    }
}

const TableWidgetRow = props => {
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
                    <div>{key} {meta}</div>
                </div>
            )

        case 'HIC':
            return (
                <div className={classes.cell}>
                    <div className={classes.item}>{category}</div>
                    <div className={classes.item}>{key}</div>
                    <div className={classes.item}>{block.activity}</div>
                </div>
            )

        case 'FBT':
            return (
                <div className={classes.cell}>
                    <div className={classes.item}>{category}:</div>
                    <div className={classes.item}>{duration(work)}</div>
                    <div className={classes.item}>{meta.toUpperCase()}</div>
                    {block.actions.map(item => (
                        <div className={classes.item} key={item.key}>
                            {item.sets.map((set, idx) => (
                                <div key={item.key + idx}>
                                    {formatSet(item, set)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )

        case 'MS':
            const exercises = Array.from(
                work.reduce((acc, item) => {
                    acc.add(item.key)
                    return acc
                }, new Set())
            )
            const content = exercises.join(' ')

            return (
                <Popup trigger={<div>MS: {content}</div>}>
                    {work.map(item => (
                        <div className={classes.cell} key={item.key}>
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

export default withStyles(styles)(TableWidgetRow)
