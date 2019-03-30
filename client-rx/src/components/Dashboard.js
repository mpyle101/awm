import React from 'react'
import withStyles from 'react-jss'

import { Segment } from 'semantic-ui-react'

import EditorWidget from './editor-widget'
import PieChartWidget from './pie-chart-widget'
import TableWidget from './table-widget'

const styles = {
    main: {
        height: '100%',
        padding: '10px',
        display: 'grid',
        gridTemplate: 'repeat(2, minmax(0, 1fr)) / 1fr 1fr',
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
    table:    { gridArea: 'tbl' },
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
                <EditorWidget />
            </Segment>
            <Segment className={classes.chart}>
                <PieChartWidget />
            </Segment>
        </div>
    )
}

export default withStyles(styles)(Dashboard)