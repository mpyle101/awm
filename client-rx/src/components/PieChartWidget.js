import React from 'react'
import { connect } from 'react-redux'
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from 'recharts'

import COLORS from './colors'

const PieWidget = props => {
    const { workouts } = props

    let total = 0
    const counts = workouts
        .filter(item => item.type !== 'OFF')
        .flatMap(item => item.blocks.map(block => {
            let category = block.type
            if (category === 'EN' && block.key === 'FBT') {
                category = 'FBT'
            }
            return { ...block, category }
        }))
        .filter(item => item.type !== 'BR')
        .reduce((acc, item) => {
            const category = item.category
            acc[category] = acc[category] ? acc[category] + 1 : 1
            total += 1
            return acc
        }, {})

    const data = Object.keys(counts).map(key => ({
        name: key,
        value: Math.round(counts[key] / total * 100)
    }))
    
    return (
        <ResponsiveContainer width="90%" height="90%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    label
                    isAnimationActive={false}
                >
                    {
                        data.map((item, index) => 
                            <Cell key={`cell-${index}`} fill={COLORS[item.name]} />)
                    }
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

const mapStateToProps = state => ({
    workouts: state.workouts.items
})

export default connect(mapStateToProps)(PieWidget)