import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { of as observableOf, Subscription } from 'rxjs'
import { DragulaService } from 'ng2-dragula'
import * as moment from 'moment'
import { v4 as uuid } from 'uuid'

import { CurrentDateService, WorkoutService } from '../services'
import { Exercise } from '../models/exercise.model'
import { ExerciseDataSource } from '../data/exercise-datasource'
import { WorkoutDataSource }  from '../data/workout-datasource'

@Component({
    selector: 'awm-workout-editor',
    templateUrl: './workout-editor.component.html',
    styleUrls: ['./workout-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutEditorComponent implements OnDestroy {

    @ViewChild('sidenav') sidenav

    public blocks
    public cycle
    public datestr
    public exercises
    public item

    public styles = {'font-size': '16px'}

    private date
    private subs = new Subscription()

    constructor(
        ds: ExerciseDataSource,
        route: ActivatedRoute,
        dragula: DragulaService,
        private cdRef: ChangeDetectorRef,
        private workoutSvc: WorkoutService,
        private dataSource: WorkoutDataSource,
        private currentDate: CurrentDateService
    ) {
        route.params.subscribe(params => this.load(params))
        ds.connect().subscribe(items => this.exercises = items)
    }

    ngOnDestroy() {
        this.subs.unsubscribe()
    }

    get workouts() {
        return this.workoutSvc
    }

    public toggleSidenav() {
        this.sidenav.toggle()
        this.cdRef.markForCheck()
    }

    public onSubmit() {
        console.log(this.blocks)
    }

    public onCreateBlock(type) {
        const actions = []
        this.blocks = [...this.blocks, {type, actions}]
    }

    public onDeleteBlock(block) {
        this.blocks = this.blocks.filter(blk => blk != block)
    }

    public onCreateAction(block) {
        const key  = '', work = '', unit = ''
        this.blocks = this.blocks.map(blk => ({
            type: blk.type,
            actions: blk == block ? [...blk.actions, {key, work, unit}] : [...blk.actions]
        }))
    }

    public onDeleteAction(block, action) {
        this.blocks = this.blocks.map(blk => ({
            type: blk.type,
            actions: blk == block ? blk.actions.filter(act => act != action) : [...blk.actions]
        }))
    }

    public onChange(action) {
        console.log(action)
    }

    private load(params) {
        this.date = moment([params['year'], params['month'] - 1, params['day']])
        this.datestr = this.date.toISOString()
        this.dataSource.get(this.date).subscribe(items => this.refresh(items[0]))
    }

    private refresh(item) {
        if (item) {
            this.item   = item
            this.cycle  = item.cycle
            this.blocks = item.blocks.map(block => ({
                type: block.type,
                actions: block.actions.reduce((acc, action) => {
                    const sets = action.sets.map(set => ({
                        id:   uuid(),
                        key:  action.key,
                        work: set.wt ? `${set.count}x${set.wt}x${set.reps}` : `${set.count}x${set.reps}`,
                        unit: set.wt ? action.unit : 'BW' 
                    }))

                    // Because Chrome doesn't support flat or concat.
                    sets.map(set => acc.push(set))

                    return acc
                }, [])
            }))
        }

        this.cdRef.markForCheck()

        this.currentDate.next(this.date)
    }
}
