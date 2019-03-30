
/**
 * Return the specified block or the first block of the workout
 * items if available.
 * @param {*} state 
 */
export const getSelectedBlock = state =>
    state.selectedBlock ? state.selectedBlock
        : state.workouts.items.length ? state.workouts.items[0] : null