/**
 * General Endurance Component
 */

import { Component } from '@angular/core'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-en-block',
    templateUrl: './en-block.component.html',
    styleUrls: ['./en-block.component.css']
})
export class EnduranceComponent extends TrainingBlockComponent {

    constructor() {
        super()
    }

    ngOnInit() {}

    public get meta() {
        let meta = this.block.met
        if (this.block.meta) {
            meta = this.block.meta.toLowerCase()
            meta = meta[0].toUpperCase() + meta.slice(1)
        }

        return meta
    }

    public get icon() {
        if (typeof this.block.meta === 'string') {
            return this.block.meta.toUpperCase()
        } else {
            return this.block.key.toUpperCase()
        }
    }
    
}
