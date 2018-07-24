
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { WorkoutTableComponent } from './workout-table.component'

describe('WorkoutTableComponent', () => {
    let component: WorkoutTableComponent
    let fixture: ComponentFixture<WorkoutTableComponent>

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ WorkoutTableComponent ]
        })
        .compileComponents()

        fixture = TestBed.createComponent(WorkoutTableComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should compile', () => {
        expect(component).toBeTruthy()
    })

})
