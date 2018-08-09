import { Component, Input } from '@angular/core'

import { WorkoutService } from '../services'

@Component({
    selector: 'awm-tr-block',
    templateUrl: './training-block.component.html',
    styleUrls: ['./training-block.component.scss']
})
export class TrainingBlockComponent {

    @Input() block: any
    @Input() mode = 'default'
    @Input() styles: any

    count = 0

    constructor(private service: WorkoutService) {}

    get icon() {
        this.count += 1
        console.log(this.count)
        return this.service.getIcon(this.block.type)
    }

    get label() {
        return this.service.getLabel(this.block.type)
    }
}
