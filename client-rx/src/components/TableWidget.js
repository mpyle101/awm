import React from 'react'
import withStyles from 'react-jss'
import { connect } from 'react-redux'

import { Table } from 'semantic-ui-react'

const styles = {
    main: {
        height: '100%'
    },
    row: {
        fontSize: '0.7rem'
    }
}

const TableWidget = props => {
    const { classes, workouts } = props

    const renderRow = item => (
        <Table.Row className={classes.row} key={item._id}>
            <Table.Cell collapsing>
                {item.date.format('MMM D, Y')}
            </Table.Cell>
            <Table.Cell>
                BLOCKS
            </Table.Cell>
        </Table.Row>
    )

    return (
        <div className={classes.main}>
            <Table
                tableData={workouts}
                renderBodyRow={renderRow}
                compact="very" striped
            />
        </div>
    )
}

const mapStateToProps = state => ({
    workouts: state.workouts.items
})

const styled = withStyles(styles)(TableWidget)
export default connect(mapStateToProps)(styled)