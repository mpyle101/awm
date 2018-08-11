import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { WorkoutViewDialogComponent } from './workout-dialog.component'

describe('WorkoutViewDialogComponent', () => {
    let component: WorkoutViewDialogComponent
    let fixture: ComponentFixture<WorkoutViewDialogComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WorkoutViewDialogComponent ]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkoutViewDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
