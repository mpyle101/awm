import { Component, Input, OnInit, ViewChild } from '@angular/core'
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup
} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import * as moment from 'moment'

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
export class WorkoutEditorComponent implements OnInit{

    @ViewChild('sidenav') sidenav

    public datestr
    public cycle

    public exercises
    public form: FormGroup
    public workouts = WorkoutTypes

    public item
    private date

    constructor(
        ds: ExerciseDataSource,
        route: ActivatedRoute,
        private fb: FormBuilder,
        private dataSource: WorkoutDataSource,
        private currentDate: CurrentDateService
    ) {
        route.params.subscribe(params => this.load(params))
        ds.connect().subscribe(items => this.exercises = items)
    }

    ngOnInit() {
        this.form = this.fb.group({
            blocks: this.fb.array([this.fb.group({
                type: 'MS',
                actions: this.fb.array([])
            })])
        })
    }

    public getBlocks(form) {
        return (<FormArray>this.form.controls.blocks).controls
    }

    public getActions(block) {
        return (<FormArray>block.controls.actions).controls
    }

    public toggleSidenav() {
        this.sidenav.toggle()
    }

    private load(params) {
        this.date = moment([params['year'], params['month'] - 1, params['day']])
        this.datestr = this.date.toISOString()
        this.dataSource.get(this.date).subscribe(items => this.refresh(items[0]))
    }

    private refresh(item) {
        if (item) {
            this.item  = item
            this.cycle = item.cycle
            this.updateBlocks(item)
        }

        this.currentDate.next(this.date)
    }

    private updateBlocks(item) {
        if (item.blocks.length) {
            const blocks = this.form.get('blocks') as FormArray
            blocks.removeAt(0)
            item.blocks.map(block => blocks.push(this.fb.group({
                type: block.type,
                actions: this.createActions(block.actions)                
            })))
        }
    }

    private createActions(actions): FormArray {
        let groups = []
        if (actions) {
            groups = actions.reduce((acc, action) => {
                const key  = action.key
                const unit = action.unit
                const sets = action.sets.map(set => this.fb.group({
                    key:  key,
                    work: set.wt ? `${set.count}x${set.wt}x${set.reps}` : `${set.count}x${set.reps}`,
                    unit: set.wt ? unit : 'BW'
                }))

                // Because Chrome doesn't support flat or concat.
                sets.map(set => acc.push(set))

                return acc
            }, [])
        }

        return this.fb.array(groups)
    }

}
