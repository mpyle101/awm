import { ChangeDetectorRef, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDialog, MatSnackBar } from "@angular/material"
import { DragulaService } from 'ng2-dragula'
import * as moment from 'moment'

import { CurrentDateService, WorkoutService } from '../services'
import { ExerciseDataSource } from '../data/exercise-datasource'
import { WorkoutDataSource }  from '../data/workout-datasource'
import { WorkoutListDialog }  from '../dialogs'

@Component({
    selector: 'awm-workout-editor',
    templateUrl: './workout-editor.component.html',
    styleUrls: ['./workout-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutEditorComponent {

    @ViewChild('sidenav') sidenav

    public blocks
    public cycle
    public datestr
    public exercises
    public item

    public styles = {'font-size': '16px'}

    private date

    constructor(
        ds: ExerciseDataSource,
        route: ActivatedRoute,
        dragula: DragulaService,
        private cdRef: ChangeDetectorRef,
        private dialog: MatDialog,
        private workoutSvc: WorkoutService,
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
        console.log(this.blocks)
    }

    public onCreateBlock(event) {
        console.log(event)
        const ref = this.dialog.open(WorkoutListDialog, {
            autoFocus: false,
            hasBackdrop: true,
            panelClass: 'awm-dialog-container'
        })
        ref.afterClosed().subscribe(item => {
            if (item) {
                this.blocks = [...this.blocks, {type: item.type, actions: []}]
                this.cdRef.markForCheck()
            }
        })
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
        }

        this.cdRef.markForCheck()

        this.currentDate.next(this.date)
    }
}
