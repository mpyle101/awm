import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import * as moment from "moment"

import { WorkoutDataSource } from '../data/workout-datasource'

@Component({
    selector: 'awm-workout-table',
    templateUrl: './workout-table.component.html',
    styleUrls: ['./workout-table.component.css']
})
export class WorkoutTableComponent implements OnInit {
    
    @ViewChild('EN')  typeEN:  TemplateRef<any>
    @ViewChild('MS')  typeMS:  TemplateRef<any>
    @ViewChild('SE')  typeSE:  TemplateRef<any>
    @ViewChild('SS')  typeSS:  TemplateRef<any>
    @ViewChild('GC')  typeGC:  TemplateRef<any>
    @ViewChild('OFF') typeOFF: TemplateRef<any>
    @ViewChild('HIC') typeHIC: TemplateRef<any>
    @ViewChild('HGC') typeHGC: TemplateRef<any>

    private refs

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['date', 'cycle', 'blocks']

    constructor(
        private route: ActivatedRoute,
        private dataSource: WorkoutDataSource
    ) {
        this.route.params.subscribe(params => this.load(params))
    }

    ngOnInit() {
        this.refs = {
            'EN': this.typeEN,
            'MS': this.typeMS,
            'SE': this.typeSE,
            'SS': this.typeSS,
            'GC': this.typeGC,
            'OFF': this.typeOFF,
            'HIC': this.typeHIC,
            'HGC': this.typeHGC
        }
    }

    getTemplate(block) {
        return this.refs[block.type]
    }

    private load(params) {
        let start = moment().date(1)
        if (params['year']) {
            start.year(params['year']).month(params['month'] - 1)
        }

        let end = start.clone().endOf('month')
        start.subtract(start.weekday(), 'day')
        end.add(6 - end.weekday(), 'day')

        this.dataSource.load(start, end)
    }

}
