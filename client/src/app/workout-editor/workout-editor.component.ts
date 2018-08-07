import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { of as observableOf } from 'rxjs'
import * as moment from 'moment'

import { CurrentDateService } from '../services'
import { Exercise } from '../models/exercise.model'
import { ExerciseDataSource } from '../data/exercise-datasource'
import { WorkoutDataSource }  from '../data/workout-datasource'

import { WorkoutTypes } from './workout-consts'

@Component({
    selector: 'awm-workout-editor',
    templateUrl: './workout-editor.component.html',
    styleUrls: ['./workout-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutEditorComponent {

    @ViewChild('sidenav') sidenav

    public datestr
    public cycle

    public blocks = []
    public exercises
    public workouts = WorkoutTypes

    public item
    private date

    constructor(
        ds: ExerciseDataSource,
        route: ActivatedRoute,
        private dataSource: WorkoutDataSource,
        private currentDate: CurrentDateService,
        private changeDetector: ChangeDetectorRef
    ) {
        route.params.subscribe(params => this.load(params))
        ds.connect().subscribe(items => this.exercises = items)
    }

    public toggleSidenav() {
        this.sidenav.toggle()
    }

    public onSubmit() {
        console.log(this.blocks)
    }

    public onCreateBlock() {
        this.blocks.push({type: 'MS', actions: []})
    }

    public onDeleteBlock(idx) {
        this.blocks.splice(idx, 1)
    }

    public onCreateAction(block) {
        block.actions.push({type: 'BSS', work: '', unit: 'KG'})
    }

    public onDeleteAction(block, idx) {
        block.actions.splice(idx, 1)
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
                        key:  action.key,
                        work: set.wt ? `${set.count}x${set.wt}x${set.reps}` : `${set.count}x${set.reps}`,
                        unit: set.wt ? action.unit : 'BW' 
                    }))

                    // Because Chrome doesn't support flat or concat.
                    sets.map(set => acc.push(set))

                    return acc
                }, [])
            }))

            this.changeDetector.markForCheck()
        }

        this.currentDate.next(this.date)
    }
}
