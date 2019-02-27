import React from 'react'
import { connect } from 'react-redux'
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts'

const PieWidget = props => {
    const { workouts } = props

    let total = 0
    const counts = workouts
        .filter(item => item.type !== 'OFF')
        .reduce((acc, item) => {
            acc[item.type] = acc[item.type] ? acc[item.type] + 1 : 1
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
                    fill="#3f51b5"
                    label
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

const mapStateToProps = state => ({
    workouts: state.workouts.items
})

export default connect(mapStateToProps)(PieWidget)