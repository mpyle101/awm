import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'training-card',
    template: ''
})
export class TrainingBlockCard implements OnInit {

    @Input() block: any

    constructor() {}

    ngOnInit() {}
    
}
