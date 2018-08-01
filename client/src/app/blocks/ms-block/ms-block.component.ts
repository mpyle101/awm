/**
 * Max Strength Component
 */
import { Component, Input, OnInit } from '@angular/core'
import { MaxStrengthService } from '../../services/ms-block.service'
import { BlockDataSource } from '../block-datasource'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-ms-block',
    templateUrl: './ms-block.component.html',
    styleUrls: ['./ms-block.component.css']
})
export class MaxStrengthComponent extends TrainingBlockComponent {

    public dataSource: BlockDataSource
    public displayedColumns = ['key', 'sets', 'unit']

    constructor(private service: MaxStrengthService) {
        super()
    }

    ngOnInit() {
        this.dataSource = new BlockDataSource(this.block)
    }

    public getFirstSet() {
        const set = this.block.actions[0].sets[0]
        const key = this.block.actions[0].key
        return { key, ...set }
    }
    
}
