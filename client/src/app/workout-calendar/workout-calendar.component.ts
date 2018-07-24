import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from "@angular/material"
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import * as moment from "moment"

import { CurrentDateService }     from '../services'
import { WorkoutDataSource }      from '../data/workout-datasource'
import { WorkoutDialogComponent } from '../workout-dialog'


@Component({
    selector: 'awm-workout-calendar',
    templateUrl: './workout-calendar.component.html',
    styleUrls: ['./workout-calendar.component.css']
})
export class WorkoutCalendarComponent implements OnInit {

    public loaded = false
    public items  = []
    public weeks  = []
    public styles = {
        'padding': '2px 6px 2px 2px',
    }

    private current: any

    constructor(
        route: ActivatedRoute,
        private dialog: MatDialog,
        private router: Router,
        private dataSource: WorkoutDataSource,
        private currentDate: CurrentDateService
    ) {
        route.params.subscribe(params => this.load(params))
    }

    ngOnInit() {
        this.dataSource.connect().subscribe(items => this.refresh(items))
    }

    ngOnDestroy() {
        this.dataSource.disconnect()
    }

    public doClick(event, item) {
        const ref = this.dialog.open(WorkoutDialogComponent, {
            data: { item },
            height: '400px',
            width: '448px',
            autoFocus: true,
            hasBackdrop: false,
            disableClose: true,
            panelClass: 'awm-dialog-container'
        })
        ref.afterClosed().subscribe(item => this.edit(item))
    }

    public blocks(item) {
        return item.workout.blocks
    }

    private edit(item) {
        const date = item.date
        this.router.navigate(['workout', date.year(), date.month() + 1, date.date()])
    }

    private load(params) {
        let start = moment().date(1)
        if (params['year']) {
            start.year(params['year']).month(params['month'] - 1)
        }

        this.current = start.clone()

        let end = start.clone().endOf('month')
        start.subtract(start.weekday(), 'day')
        end.add(6 - end.weekday(), 'day')

        this.dataSource.load(start, end)
    }

    private refresh(items) {
        const range = this.dataSource.range
        if (range) {
            const workouts = items.reduce((m, v) => {
                const [day,...rest] = v.date.split('T')
                m.set(day, v)
                return m
            }, new Map())

            const days = Array.from(range.by('day'))
            this.items = days.map((date:any) => {
                const workout = workouts.get(date.format('YYYY-MM-DD')) || { blocks:[] }
                return { date, num: date.date(), workout }
            })

            this.weeks = []
            for (let i = 0; i < this.items.length; i += 7) {
                this.weeks.push(this.items.slice(i, i + 7)) 
            }

            this.loaded = true 
            this.currentDate.next(this.current)
        }

    }

}
