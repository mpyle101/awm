import React from 'react'
import withStyles from 'react-jss'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import { selectBlock } from '../actions'
import COLORS from './colors'
import Block from './Block'

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
    const { classes, selectBlock, block, workouts } = props

    const data = workouts
        .filter(item => item.type !== 'OFF')
        .flatMap(item => item.blocks.map((block, idx) => {
            let category = block.type
            if (category === 'EN' && block.key === 'FBT') {
                category = 'FBT'
            }
            const date = item.date
            const show = idx === 0

            return { ...block, category, date, show }
        }))
        .filter(item => item.type !== 'BR')

    if (block === null && data.length) {
        selectBlock(data[0])
    }

    const renderRow = block => (
        <Table.Row className={classes.row} onClick={() => selectBlock(block)} key={block.id}>
            <Table.Cell collapsing>
                {block.show ? block.date.format('MMM D, Y') : ''}
            </Table.Cell>
            <Table.Cell style={{ backgroundColor: COLORS[block.category] }}>
                <Block block={block} />
            </Table.Cell>
        </Table.Row>
    )

    return (
        <div className={classes.scroller}>
            <Table
                selectable
                tableData={data}
                renderBodyRow={renderRow}
                compact="very"
            />
        </div>
    )
}

const mapStateToProps = state => ({
    block: state.block,
    workouts: state.workouts.items
})

const styled = withStyles(styles)(TableWidget)
export default connect(
    mapStateToProps,
    { selectBlock }
)(styled)