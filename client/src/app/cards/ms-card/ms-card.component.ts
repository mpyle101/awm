/**
 * Max Strength Card
 */

import { Component } from '@angular/core'
import { BlockDataSource } from '../block-datasource'
import { TrainingBlockCard } from '../training-card.component'


@Component({
    selector: 'ms-card',
    templateUrl: './ms-card.component.html',
    styleUrls: ['./ms-card.component.css']
})
export class MaxStrengthCard extends TrainingBlockCard {

    public dataSource: BlockDataSource
    public displayedColumns = ['keys', 'sets']

    constructor() {
        super()
    }

    ngOnInit() {
        const eq = (a, b) => {
            return a.wt == b.wt && a.reps == b.reps
        }

        const first = this.block.sets[0]
        const mvmts = this.block.sets.slice(1).reduce((mvmts, set) => {
            
            let curr = mvmts[mvmts.length - 1]
            if (curr.key == set.key) {
                let curr_set = curr.sets[curr.sets.length - 1]
                if (eq(curr_set, set)) {
                    curr_set.count += 1
                } else {
                    curr.sets.push({wt: set.wt, reps: set.reps, count: 1})
                }
            } else {
                mvmts.push({key: set.key, sets: [{wt: set.wt, reps: set.reps, count: 1}]})
            }

            return mvmts

        }, [{key: first.key, sets: [{wt: first.wt, reps: first.reps, count: 1}]}])

        this.dataSource = new BlockDataSource(mvmts)
    }
    
}
