import { Component } from '@angular/core'
import { MatDialogRef } from "@angular/material"

import { WorkoutService } from '../../services'

@Component({
    selector: 'awm-workout-list-dialog',
    templateUrl: './workout-list.component.html',
    styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListDialog {

    public styles = {
        'height': '30px',
        'padding-left': '5px',
        'padding-right': '5px'
    }

    constructor(
        private workoutSvc: WorkoutService,
        private dialogRef: MatDialogRef<WorkoutListDialog>,
    ) {}

    public get workouts() {
        return this.workoutSvc
    }

    public onClose(item) {
        this.dialogRef.close(item)
    }
}
