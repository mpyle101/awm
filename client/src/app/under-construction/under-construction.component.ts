import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'under-construction',
    templateUrl: './under-construction.component.html',
    styleUrls: ['./under-construction.component.scss']
})
export class UnderConstruction implements OnInit {

    image = '/assets/under-construction.jpg'

    constructor() { }

    ngOnInit() { }

}
