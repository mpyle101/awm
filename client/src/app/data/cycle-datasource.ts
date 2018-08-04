import { Injectable } from '@angular/core'
import { DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, finalize } from 'rxjs/operators'

import { Cycle } from '../models/cycle.model'
import { HttpService } from '../services'


/**
 * Data source for the Workouts view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Injectable({
    providedIn: 'root'
})
export class CycleDataSource extends DataSource<Cycle> {

    private dataSubject    = new BehaviorSubject<Cycle[]>([])
    private loadingSubject = new BehaviorSubject<boolean>(false)

    private url = 'http://localhost:9000/api/cycles'

    public loading$ = this.loadingSubject.asObservable()

    constructor(private http: HttpService<Cycle>)
    {
        super()
        http.init(this.url)
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<Cycle[]> {
        return this.dataSubject.asObservable()
    }

    /**
     * Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {}

    get total() {
        return this.http.total
    }

    /**
     * Load the specified set of workouts.
     */
    load() {
        this.loadingSubject.next(true)
        this.http.get()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(items => this.dataSubject.next(items))
    }
}


