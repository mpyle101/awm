import React from 'react'
import withStyles from 'react-jss'

import { Segment } from 'semantic-ui-react'

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
                <img src="img/table.png" alt="Table view" />
            </Segment>
            <Segment className={classes.editor}>
                <img src="img/editor.png" alt="Editor" />
            </Segment>
            <Segment className={classes.chart}>
                <img src="img/piechart.jpg" alt="Chart"/>
            </Segment>
        </div>
    )
}

export default withStyles(styles)(Dashboard)