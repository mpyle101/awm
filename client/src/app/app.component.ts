import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { MatIconRegistry } from '@angular/material/icon'
import * as moment from "moment"

import { ExerciseDataSource } from './data/exercise-datasource'
import { CurrentDateService } from './services'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public title = 'AWM'
    public today   = moment()
    public current = moment()

    private component

    constructor(
        registry: MatIconRegistry,
        sanitizer: DomSanitizer,
        dataSource: ExerciseDataSource,
        private router: Router,
        private currentDate: CurrentDateService)
    {
        let path = sanitizer.bypassSecurityTrustResourceUrl('../assets/weightlifting.svg')
        registry.addSvgIcon('svg-weights', path)

        path = sanitizer.bypassSecurityTrustResourceUrl('../assets/stationary-bike.svg')
        registry.addSvgIcon('svg-trainer', path)

        this.currentDate.connect().subscribe(date => this.refresh(date))

        // Prefetch the exercise data
        dataSource.load()
    }

    public onToday() {
        const path = this.router.url.split('/')[1]
        this.router.navigate([path, this.today.year(), this.today.month() + 1])
    }

    public onPrev(unit) {
        // Clone so change detection gets kicked
        const path = this.router.url.split('/')[1]
        this.current.subtract(1, unit)
        this.router.navigate([path, this.current.year(), this.current.month() + 1])
    }

    public onNext(unit) {
        // Clone so change detection gets kicked
        const path = this.router.url.split('/')[1]
        this.current.add(1, unit)
        this.router.navigate([path, this.current.year(), this.current.month() + 1])
    }

    public onToggle() {
        this.component.toggleSidenav()
    }

    public onActivate(componentRef) {
        this.component = componentRef
    }

    private refresh(date) {
        this.current = date
    }

}
