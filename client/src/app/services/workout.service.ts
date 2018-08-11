import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {

    private workouts = new Map([
        [ 'BR',  { type: 'BR',  icon: 'local_cafe',         label: 'Break' }],
        [ 'EN',  { type: 'EN',  icon: 'directions_bike',    label: 'Endurance' }],
        [ 'GC',  { type: 'GC',  icon: 'directions_bike',    label: 'General Conditioning' }],
        [ 'HGC', { type: 'HGC', icon: 'motorcycle',         label: 'High Intensity GC' }],
        [ 'HIC', { type: 'HIC', icon: 'directions_running', label: 'High Intensity Conditioning' }],
        [ 'MS',  { type: 'MS',  icon: 'fitness_center',     label: 'Strength' }],
        [ 'SE',  { type: 'SE',  icon: '360',                label: 'Strength Endurance' }],
        [ 'SS',  { type: 'SS',  icon: 'fitness_center',     label: 'Super Sets' }]
    ])

    getIcon(t) {
        return this.workouts.get(t).icon        
    }

    getLabel(t) {
        return this.workouts.get(t).label
    }

    [Symbol.iterator]() { 
        return this.workouts.values()
    }
}
