import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatSnackBar } from "@angular/material"
import * as moment from 'moment'

import { CurrentDateService } from '../services'
import { WorkoutDataSource }  from '../data'

@Component({
    selector: 'awm-tr-editor',
    templateUrl: './tr-editor.component.html',
    styleUrls: ['./tr-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingBlockEditor {

    @ViewChild('editor') editor
    @ViewChild('sidenav') sidenav

    public block
    public datestr

    private item
    private date

    constructor(
        route: ActivatedRoute,
        private cdRef: ChangeDetectorRef,
        private dataSource: WorkoutDataSource,
        private currentDate: CurrentDateService
    ) {
        route.params.subscribe(params => this.load(params))
    }

    public toggleSidenav() {
        this.sidenav.toggle()
        this.cdRef.markForCheck()
    }

    public onSubmit() {
        console.log(this.block)
    }

    private load(params) {
        this.block = { type: params['type'].toUpperCase() }
        this.date = moment([params['year'], params['month'] - 1, params['day']])
        this.datestr = this.date.toISOString()

        this.dataSource.get(this.date).subscribe(items => this.refresh(items[0], params['id']))
    }

    private refresh(item, bid) {
        this.item = item

        this.block = bid ? item.blocks.filter(b => b.id == bid)[0] : undefined
        console.log('REFRESH1')
        this.editor.block = this.block
        console.log('REFRESH2')

        this.cdRef.markForCheck()
        this.currentDate.next(this.date)
    }
}
