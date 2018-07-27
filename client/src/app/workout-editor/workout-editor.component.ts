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
  styleUrls: ['./workout-editor.component.css']
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
                sets: this.fb.array([])
            })])
        })
    }

    public getBlocks(form) {
        return (<FormArray>this.form.controls.blocks).controls
    }

    public getSets(block) {
        return (<FormArray>block.controls.sets).controls
    }

    public toggleSidenav() {
        this.sidenav.toggle()
    }

    private load(params) {
        this.date = moment([params['year'], params['month'] - 1, params['day']])
        this.datestr = this.date.toISOString()
        this.dataSource.get(this.date).subscribe(item => this.refresh(item))
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
                sets: this.createSets(block.sets)                
            })))
        }
    }

    private createSets(sets): FormArray {
        if (sets) {
            return this.fb.array(sets.map(set => this.fb.group({
                key: set.key,
                action: set.wt ? `1x${set.wt}x${set.reps}` : `1x${set.reps}`,
                unit: set.wt ? set.unit : 'BW'
            })))
        }

        return this.fb.array([])
    }

}
