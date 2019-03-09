import * as moment from 'moment'
import { ajax } from 'rxjs/ajax'

const URL = 'http://localhost:9000/api/workouts'

const build_query = (filter, sort) => {
    const params = Object.keys(sort).map(key => {
        const value = sort[key] === 'asc' ? `${key}` : `-${key}`
        return `__sort=${value}`
    })

    for (let key in filter) {
        const attr = filter[key]
        if (typeof attr === 'string') {
            params.push(`${key}=${attr}`)
        } else {
            for (let op in attr) {
                params.push(`${key}__${op}=${attr[op]}`)
            }
        }
    }

    return params.join('&')
}

const get_range = date => {
    // Start with the first day of the month for the desired month & year
    const start = moment(date).date(1)
    const end = start.clone().endOf('month')

    // Move start to the beginning of the week and end to the... end.
    start.subtract(start.weekday(), 'day')
    end.add(6 - end.weekday(), 'day')

    return { start, end }
}

export const fetchWorkouts = (state, filter={}, sort={}) => {
    const date  = moment(state.selectedDate)
    const start = date.clone().subtract(state.period, 'days')
    const end   = date.clone().add(1, 'day')
    
    filter.date = {
        gte: start.format('YYYY-MM-DD'),
        lt:  end.add(1, 'day').format('YYYY-MM-DD')
    }

    const query = build_query(filter, sort)
    const url = query.length ? encodeURI([URL, query].join('?')) : URL

    return ajax.getJSON(url)
}