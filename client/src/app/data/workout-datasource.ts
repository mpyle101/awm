import { Injectable } from '@angular/core'
import { DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, finalize, map } from 'rxjs/operators'

import { Workout } from '../models/workout.model'
import { WorkoutService } from '../services'
import { MomentRangeService } from '../services'


/**
 * Data source for the Workouts view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Injectable({
    providedIn: 'root'
})
export class WorkoutDataSource extends DataSource<Workout> {

    private workoutSubject = new BehaviorSubject<Workout[]>([])
    private loadingSubject = new BehaviorSubject<boolean>(false)

    public loading$ = this.loadingSubject.asObservable()

    private _range

    constructor(
        private workoutSvc: WorkoutService,
        private momentSvc: MomentRangeService)
    {
        super()
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<Workout[]> {
        return this.workoutSubject.asObservable()
    }

    /**
     * Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {}

    get total() {
        return this.workoutSvc.total
    }

    get range() {
        return this._range
    }

    /**
     * Return the workouts for single day.
     */
    get(date) {
        return this.workoutSvc.find({
            date: {
                gte: date.format('YYYY-MM-DD'),
                lt:  date.add(1, 'day').format('YYYY-MM-DD')        
            }
        }).pipe(map(workouts => workouts.map(workout => this.processWorkout(workout))))
    }

    /**
     * Load the specified set of workouts.
     */
    load(start, end, filter:any={}) {
        this.loadingSubject.next(true)

        this._range = this.momentSvc.create(start, end)

        filter.date = {
            gte: start.format('YYYY-MM-DD'),
            lt:  end.add(1, 'day').format('YYYY-MM-DD')
        }

        this.workoutSvc.find(filter)
            .pipe(
                map(workouts => workouts.map(workout => this.processWorkout(workout))),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(workouts => this.workoutSubject.next(workouts))
    }

    private processWorkout(workout) {
        workout.blocks = workout.blocks.map(block => {
            if (block.type == 'MS') {
                block.actions = this.processMSBlock(block)
            }
            return block
        })

        return workout
    }

    private processMSBlock(block) {
        const eq = (a, b) => a.wt == b.wt && a.reps == b.reps

        const first = block.sets[0]
        const mvmts = block.sets.slice(1).reduce((mvmts, set) => {
            
            let curr = mvmts[mvmts.length - 1]
            if (curr.key == set.key) {
                let curr_set = curr.sets[curr.sets.length - 1]
                if (eq(curr_set, set)) {
                    curr_set.count += 1
                } else {
                    curr.sets.push({wt: set.wt, reps: set.reps, count: 1})
                }
            } else {
                mvmts.push(this.createAction(set))
            }

            return mvmts

        }, [this.createAction(first)])

        return mvmts
    }

    private createAction(set) {
        return {
            key: set.key,
            unit: set.unit,
            style: set.style,
            sets: [{
                wt: set.wt,
                reps: set.reps,
                count: 1
            }]
        }
    }
}


