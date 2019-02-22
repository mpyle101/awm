import React from 'react'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
    main: {
        height: '100%',
        padding: '10px',
        display: 'grid',
        gridTemplate: '1fr 1fr / 1fr 1fr',
        gridTemplateAreas: '"cal tbl" "edt cht"',
        gridGap: '10px 10px',
        '& > div': {
            border: '1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '& img': {
            width: '100%'
        }
    },
    calendar: {
        gridArea: 'cal'
    },
    table: {
        gridArea: 'tbl'
    },
    editor: {
        gridArea: 'edt'
    },
    chart: {
        gridArea: 'cht'
    }
})

const Dashboard = props => {
    const { classes } = props

    return (
        <div className={classes.main}>
            <div className={classes.calendar}>
                <img src="img/calendar.png" alt="" />
            </div>
            <div className={classes.table}>
                <img src="img/table.png" alt="" />
            </div>
            <div className={classes.editor}>
                <img src="img/editor.png" alt="" />
            </div>
            <div className={classes.chart}>
                <img src="img/piechart.jpg" alt=""/>
            </div>
        </div>
    )
}

export default withStyles(styles)(Dashboard)