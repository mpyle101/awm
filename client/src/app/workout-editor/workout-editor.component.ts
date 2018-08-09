import { Component, OnDestroy, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { of as observableOf, Subscription } from 'rxjs'
import { DragulaService } from 'ng2-dragula'
import * as moment from 'moment'
import { v4 as uuid } from 'uuid'

import { CurrentDateService } from '../services'
import { Exercise } from '../models/exercise.model'
import { ExerciseDataSource } from '../data/exercise-datasource'
import { WorkoutDataSource }  from '../data/workout-datasource'

import { WorkoutTypes } from './workout-consts'

@Component({
    selector: 'awm-workout-editor',
    templateUrl: './workout-editor.component.html',
    styleUrls: ['./workout-editor.component.scss']
})
export class WorkoutEditorComponent implements OnDestroy {

    @ViewChild('sidenav') sidenav

    public model
    public blocks
    public cycle
    public datestr
    public exercises
    public item
    public workouts = WorkoutTypes

    private date
    private subs = new Subscription()

    constructor(
        ds: ExerciseDataSource,
        route: ActivatedRoute,
        dragula: DragulaService,
        private dataSource: WorkoutDataSource,
        private currentDate: CurrentDateService
    ) {
        route.params.subscribe(params => this.load(params))
        ds.connect().subscribe(items => this.exercises = items)

        // Create a new model object each time an action is moved
        // so the json view will update.
        this.subs.add(dragula.drop()
            .subscribe(() => this.model = {blocks: this.blocks}))
    }

    ngOnDestroy() {
        this.subs.unsubscribe()
    }

    public toggleSidenav() {
        this.sidenav.toggle()
    }

    public onSubmit() {
        console.log(this.blocks)
    }

    public onCreateBlock() {
        this.blocks.push({type: 'MS', actions: []})
        this.model = {blocks: this.blocks}
    }

    public onDeleteBlock(idx) {
        this.blocks.splice(idx, 1)
        this.model = {blocks: this.blocks}
    }

    public onCreateAction(block) {
        block.actions.push({key: 'BSS', work: '', unit: 'KG'})
        this.model = {blocks: this.blocks}
    }

    public onDeleteAction(block, idx) {
        block.actions.splice(idx, 1)
        this.model = {blocks: this.blocks}
    }

    public onChange() {
        this.model = {blocks: this.blocks}
    }

    private load(params) {
        this.date = moment([params['year'], params['month'] - 1, params['day']])
        this.datestr = this.date.toISOString()
        this.dataSource.get(this.date).subscribe(items => this.refresh(items[0]))
    }

    private refresh(item) {
        if (item) {
            this.item = item
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

            this.model = {blocks: this.blocks}
        }

        this.currentDate.next(this.date)
    }
}
