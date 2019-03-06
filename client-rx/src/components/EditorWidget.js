import React from 'react'
import withStyles from 'react-jss'
import { connect } from 'react-redux'
import ReactJson from 'react-json-view'


const styles = {
    scroller: {
        height: '100%',
        overflow: 'auto'
    }
}

const EditorWidget = props => {
    const { classes, block } = props

    return (
        <div className={classes.scroller}>
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
        </div>
    )
}

const mapStateToProps = state => ({
    block: state.block
})

const styled = withStyles(styles)(EditorWidget)
export default connect(mapStateToProps)(styled)