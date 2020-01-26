import React from 'react'
import { connect } from 'react-redux'

import AwmButton from '../awm-button'
import { cancelFetchWorkouts } from '../../actions'

const styles = {
    color: 'white',
    backgroundColor: 'inherit',
    fontFamily: ['"Roboto"', 'sans-serif'],
    fontWeight: 500
}

const CancelButton = props => {
    return (
        <AwmButton
            style={styles}
            tooltip="Cancel current workouts fetch"
            onClick={() => props.cancelFetchWorkouts()}
        >
            Cancel
        </AwmButton>
    )
}

export default connect(null, { cancelFetchWorkouts })(CancelButton)