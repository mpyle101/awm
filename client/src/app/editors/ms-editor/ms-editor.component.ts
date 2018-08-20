import { ChangeDetectorRef, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatSnackBar } from "@angular/material"
import { DragulaService } from 'ng2-dragula'
import * as moment from 'moment'

import { CurrentDateService } from '../../services'
import { ExerciseDataSource } from '../../data'
import { WorkoutDataSource }  from '../../data'

@Component({
    selector: 'awm-ms-editor',
    templateUrl: './ms-editor.component.html',
    styleUrls: ['./ms-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaxStrengthEditor {

    @ViewChild('sidenav') sidenav

    public actions
    public block = {type: 'MS', sets: [], actions: []}
    public datestr
    public exercises

    private item
    private date

    constructor(
        ds: ExerciseDataSource,
        route: ActivatedRoute,
        private cdRef: ChangeDetectorRef,
        private dragula: DragulaService,
        private dataSource: WorkoutDataSource,
        private currentDate: CurrentDateService
    ) {
        route.params.subscribe(params => this.load(params))
        ds.connect().subscribe(items => this.exercises = items)
    }

    public toggleSidenav() {
        this.sidenav.toggle()
        this.cdRef.markForCheck()
    }

    public onSubmit() {
        console.log(this.block)
    }

    public onCreateAction(exercise) {
        this.actions = [...this.actions, {key: exercise.key, work: '', unit: exercise.unit}]
    }

    public onDeleteAction(action) {
        this.actions = this.actions.filter(a => a != action)
    }

    private load(params) {
        this.date = moment([params['year'], params['month'] - 1, params['day']])
        this.datestr = this.date.toISOString()
        this.dataSource.get(this.date).subscribe(items => this.refresh(items[0], params['id']))
    }

    private refresh(item, bid) {
        this.item = item
        if (bid) {
            this.block = item.blocks.filter(b => b.id == bid)[0]

            this.actions = this.block.actions.reduce((acc, action) => {
                const sets = action.sets.map(set => ({
                    key:  action.key,
                    work: set.wt ? `${set.count}x${set.wt}x${set.reps}` : `${set.count}x${set.reps}`,
                    unit: set.wt ? action.unit : 'BW' 
                }))

                // Because Chrome doesn't support flat or concat.
                sets.map(set => acc.push(set))

                return acc
            }, []) 
        } else {
            this.actions = []
        }

        this.cdRef.markForCheck()

        this.currentDate.next(this.date)
    }
}
