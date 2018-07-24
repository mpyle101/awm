import { Component, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import * as moment from 'moment'

import { CurrentDateService } from '../services'
import { WorkoutDataSource }  from '../data/workout-datasource'

@Component({
  selector: 'awm-workout-editor',
  templateUrl: './workout-editor.component.html',
  styleUrls: ['./workout-editor.component.css']
})
export class WorkoutEditorComponent {

    public items = []
    private current: any

    constructor(
        route: ActivatedRoute,
        private dataSource: WorkoutDataSource,
        private currentDate: CurrentDateService
    ) {
        route.params.subscribe(params => this.load(params))
    }

    private load(params) {
        this.current = moment([params['year'], params['month'] - 1, params['day']])
        this.dataSource.get(this.current).subscribe(items => this.refresh(items))
    }

    private refresh(items) {
        this.items = items
        this.currentDate.next(this.current)
    }
}
