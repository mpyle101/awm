import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-icon',
    templateUrl: './app-icon.component.html',
    styleUrls: ['./app-icon.component.scss']
})
export class AppIconComponent implements OnInit {

    @Input() icon: string

    constructor() {}

    ngOnInit() {}

}
