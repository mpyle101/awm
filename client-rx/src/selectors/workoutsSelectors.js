
/**
 * Return array of blocks for all workouts excluding off days and
 * breaks.
 * @param {*} state 
 */
export const getBlocks = state =>
    state.workouts.items
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