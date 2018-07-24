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

    public mvmts = []
    public dataSource: BlockDataSource
    public displayedColumns = ['key', 'sets']

    constructor(private service: MaxStrengthService) {
        super()
    }

    ngOnInit() {
        this.mvmts = this.service.process(this.block)
        this.dataSource = new BlockDataSource(this.mvmts)
    }

    public getFirstSet() {
        const set = this.mvmts[0].sets[0]
        const key = this.mvmts[0].key
        return { key, ...set }
    }
    
}
