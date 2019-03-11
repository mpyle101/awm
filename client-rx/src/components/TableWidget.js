import React from 'react'
import withStyles from 'react-jss'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import COLORS from './colors'
import { selectBlock } from '../actions'
import { getBlocks } from '../selectors'
import TableWidgetRow from './TableWidgetRow'

const styles = {
    scroller: {
        height: '100%',
        overflow: 'auto'
    },
    row: {
        fontSize: '0.7rem'
    }
}

const TableWidget = props => {
    const { classes, selectBlock, blocks } = props

    const renderRow = block => (
        <Table.Row className={classes.row} onClick={() => selectBlock(block)} key={block.id}>
            <Table.Cell collapsing>
                {block.show ? block.date.format('MMM D, Y') : ''}
            </Table.Cell>
            <Table.Cell style={{ backgroundColor: COLORS[block.category] }}>
                <TableWidgetRow block={block} />
            </Table.Cell>
        </Table.Row>
    )

    return (
        <div className={classes.scroller}>
            <Table
                selectable
                tableData={blocks}
                renderBodyRow={renderRow}
                compact="very"
            />
        </div>
    )
}

const mapStateToProps = state => ({
    blocks: getBlocks(state)
})

const styled = withStyles(styles)(TableWidget)
export default connect(
    mapStateToProps,
    { selectBlock }
)(styled)