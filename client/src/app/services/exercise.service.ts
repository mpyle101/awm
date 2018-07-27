import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Exercise } from '../models/exercise.model'

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {

    public meta = {start: 0, end: 0, total: 0}

    private url = 'http://localhost:9000/api/exercises'

    constructor(private http: HttpClient) {}

    get total() {
        return this.meta.total
    }

    load(): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(this.url,{observe:'response'})
            .pipe(map(resp => this.processResponse(resp)))
    }

    private processResponse(resp) {
        const header = resp.headers.get('Content-Range')
        if (header) {
            const [items, value] = header.split(' ')
            const [range, total] = value.split('/')
            const [start, end]   = range.split('-')

            this.meta.start = parseInt(start)
            this.meta.end   = parseInt(end)
            this.meta.total = parseInt(total)
        } else {
            this.meta.start = 0
            this.meta.end   = resp.body.length - 1,
            this.meta.total = resp.body.length
        }

        return resp.body
    }
}
