import React from 'react'
import withStyles from 'react-jss'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import ReactJson from 'react-json-view'

import { getSelectedBlock } from '../selectors'


const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    scroller: {
        height: '100%',
        overflow: 'auto'
    }
}

const EditorWidget = props => {
    const { classes, block } = props

    if (block === null) {
        return <div></div>
    }

    return (
        <Segment className={classes.scroller}>
            <div className={classes.header}>
                <div>{block.category}</div>
                <div>{block.date.format('MMMM Do, YYYY')}</div>
            </div>
            <ReactJson
                style={{ fontSize: '0.7rem' }}
                src={block}
                theme="shapeshifter:inverted"
                collapsed
                name={false}
                indentWidth={2}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
            />
        </Segment>
    )
}

const mapStateToProps = state => ({
    block: getSelectedBlock(state)
})

const styled = withStyles(styles)(EditorWidget)
export default connect(mapStateToProps)(styled)