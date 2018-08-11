import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material"

@Component({
    selector: 'awm-workout-view-dialog',
    templateUrl: './workout-view.component.html',
    styleUrls: ['./workout-view.component.scss']
})
export class WorkoutViewDialog implements OnInit {

    public item: any
    public styles = {
        'height': '30px',
        'padding-left': '5px',
        'padding-right': '5px'
    }

    constructor(
        private dialogRef: MatDialogRef<WorkoutViewDialog>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.item = data.item
    }

    ngOnInit() {}

    public get blocks() {
        return this.item.blocks
    }

    public doEdit() {
        this.dialogRef.close(this.item)
    }

    public doClose() {
        this.dialogRef.close()
    }

}
