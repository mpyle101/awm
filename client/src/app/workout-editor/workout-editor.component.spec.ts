
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { WorkoutEditorComponent } from './workout-editor.component'

describe('WorkoutEditorComponent', () => {
    let component: WorkoutEditorComponent
    let fixture: ComponentFixture<WorkoutEditorComponent>

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ WorkoutEditorComponent ]
        })
        .compileComponents()

        fixture = TestBed.createComponent(WorkoutEditorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should compile', () => {
        expect(component).toBeTruthy()
    })

})
