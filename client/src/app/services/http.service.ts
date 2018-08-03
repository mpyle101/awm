import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class HttpService<T> {

    public meta = {start: 0, end: 0, total: 0}
    private url

    constructor(private http: HttpClient) {}

    init(url) {
        this.url = url
    }

    get total() {
        return this.meta.total
    }

    get(filter={}, sort={}, pageIndex=0, pageSize=0): Observable<T[]> {
        return this.http.get<T>(this.url, {
            observe: 'response',
            headers: this.setupHeaders(pageIndex, pageSize),
            params:  this.setupParams(filter, sort)
        }).pipe(
            map(resp => this.processResponse(resp))
        )
    }

    post(item, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(this.url, item, {headers})
    }

    private setupParams(filter, sort) {
        let params = new HttpParams()
        if (sort.active) {
            params = params.set('__sort', sort.direction == 'asc' ? `${sort.active}` : `-${sort.active}`)
        }

        for (let key in filter) {
            const attr = filter[key]
            if (typeof attr === 'string') {
                params = params.set(key, attr)
            } else {
                for (let op in attr) {
                    params = params.set(`${key}__${op}`, attr[op])
                }
            }
        }

        return params
    }

    private setupHeaders(pageIndex, pageSize) {
        const start = pageIndex * pageSize
        const end   = pageSize ? start + pageSize - 1 : ''

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Range': `items=${start}-${end}`
        })
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
