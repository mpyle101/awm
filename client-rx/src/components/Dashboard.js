import React from 'react'
import withStyles from 'react-jss'

import { Segment } from 'semantic-ui-react'

import PieChartWidget from './PieChartWidget'
import TableWidget from './TableWidget'

const styles = {
    main: {
        height: '100%',
        padding: '10px',
        display: 'grid',
        gridTemplate: '1fr 1fr / 1fr 1fr',
        gridTemplateAreas: '"cal tbl" "edt cht"',
        gridGap: '10px',
        '& img': {
            width: '100%'
        },
        '& .ui.segment': {
            margin: '0px'
        }
    },
    calendar: { gridArea: 'cal' },
    table:    { 
        gridArea: 'tbl',
        overflow: 'auto'
    },
    editor:   { gridArea: 'edt' },
    chart:    { gridArea: 'cht' }
}

const Dashboard = props => {
    const { classes } = props

    return (
        <div className={classes.main}>
            <Segment className={classes.calendar}>
                <img src="img/calendar.png" alt="Calender view" />
            </Segment>
            <Segment className={classes.table}>
                <TableWidget />
            </Segment>
            <Segment className={classes.editor}>
                <img src="img/editor.png" alt="Editor" />
            </Segment>
            <Segment className={classes.chart}>
                <PieChartWidget />
            </Segment>
        </div>
    )
}

export default withStyles(styles)(Dashboard)