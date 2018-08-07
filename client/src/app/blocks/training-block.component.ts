import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'awm-tr-block',
    templateUrl: './training-block.component.html',
    styleUrls: ['./training-block.component.scss']
})
export class TrainingBlockComponent implements OnInit {

    @Input() block: any
    @Input() mode = 'label'
    @Input() styles: any

    constructor() {}

    ngOnInit() {}
    
}
