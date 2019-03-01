import React from 'react'
import withStyles from 'react-jss'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import COLORS from './colors'
import Block from './Block'

const styles = {
    row: {
        fontSize: '0.7rem'
    }
}


const TableWidget = props => {
    const { classes, workouts } = props

    const data = workouts
        .filter(item => item.type !== 'OFF')
        .flatMap(item => item.blocks.map((block, idx) => {
            let category = block.type
            if (category === 'EN' && block.key === 'FBT') {
                category = 'FBT'
            }
            const date = idx > 0 ? null : item.date

            return { ...block, category, date }
        }))
        .filter(item => item.type !== 'BR')

    const renderRow = block => (
        <Table.Row className={classes.row} key={block.id}>
            <Table.Cell collapsing>
                {block.date ? block.date.format('MMM D, Y') : ''}
            </Table.Cell>
            <Table.Cell style={{ backgroundColor: COLORS[block.category] }}>
                <Block block={block} />
            </Table.Cell>
        </Table.Row>
    )

    return (
        <Table
            selectable
            tableData={data}
            renderBodyRow={renderRow}
            compact="very"
        />
    )
}

const mapStateToProps = state => ({
    workouts: state.workouts.items
})

const styled = withStyles(styles)(TableWidget)
export default connect(mapStateToProps)(styled)