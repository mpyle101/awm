import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatSnackBar } from "@angular/material"
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

    @ViewChild('sidenav') sidenav

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
        private snackbar: MatSnackBar,
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

    public onClick(event, item) {
        if (item.blocks.length) {
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
        } else {
            this.edit(item)
        }
    }

    public onDrop(event, item) {
        const block = JSON.parse(event)
        if (item.blocks) {
            item.blocks.push(block)
            this.dataSource.update(item).subscribe(
                () => this.openSnackBar('Workout updated'),
                err => this.openSnackBar(`Failed to update workout: ${err}`)
            )
        } else {
            item.type   = block.type
            item.blocks = [block]
            this.dataSource.create(item).subscribe(
                () => this.openSnackBar('Workout created'),
                err => this.openSnackBar(`Failed to create workout: ${err}`)
            )
        }
    }

    public show(type) {
        return true
    }

    public toggleSidenav() {
        this.sidenav.toggle()
    }

    public openSnackBar(message, duration=2000) {
        this.snackbar.open(message, '', {duration})
    }

    private edit(item) {
        if (item) {
            const date = item.date
            this.router.navigate(['workout', date.year(), date.month() + 1, date.date()])
        }
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

            const none = { cycle: null, type: null, blocks: [] }
            const days = Array.from(range.by('day'))
            this.items = days.map((date:any) => {
                date.utcOffset('-0600').set({hour: 12, minute: 0, second: 0, millisecond: 0})
                const workout = workouts.get(date.format('YYYY-MM-DD')) || {}
                return { 
                    date,
                    num: date.date(),
                    type: workout.type,
                    cycle: workout.cycle,
                    blocks: workout.blocks
                }
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
