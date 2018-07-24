import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SuperSetComponent } from './ss-block.component'

describe('SuperSetComponent', () => {
    
    let component: SuperSetComponent
    let fixture: ComponentFixture<SuperSetComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SuperSetComponent]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SuperSetComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

})
