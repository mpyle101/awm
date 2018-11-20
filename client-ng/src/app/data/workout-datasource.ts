import { Injectable } from '@angular/core'
import { DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, finalize, map } from 'rxjs/operators'
import * as clone from "clone-deep"

import { Workout } from '../models/workout.model'
import { HttpService } from '../services'
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
    private url = 'http://localhost:9000/api/workouts'

    constructor(
        private momentSvc: MomentRangeService,
        private http: HttpService<Workout>)
    {
        super()
        http.init(this.url)
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
        return this.http.total
    }

    get range() {
        return this._range
    }

    /**
     * Return the workouts for single day.
     */
    get(date): Observable<Workout[]> {
        return this.http.get({
            date: {
                gte: date.format('YYYY-MM-DD'),
                lt:  date.add(1, 'day').format('YYYY-MM-DD')        
            }
        }).pipe(map(workouts => workouts.map(workout => this.processWorkout(workout))))
    }

    /**
     * Create a new workout.
     */
    create(item): Observable<Workout> {
        const doc = {
            date: item.date.toDate(),
            type: item.type,
            blocks: clone(item.blocks)
        }

        doc.blocks.forEach(block => delete block.actions)

        return this.http.post(doc)
    }

    /**
     * Update an existing workout.
     */
    update(item): Observable<Workout> {
        return throwError('Not Implemented')
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

        this.http.get(filter)
            .pipe(
                map(workouts => workouts.map(workout => this.processWorkout(workout))),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(workouts => this.workoutSubject.next(workouts))
    }

    private processWorkout(workout) {
        return workout
    }
}


