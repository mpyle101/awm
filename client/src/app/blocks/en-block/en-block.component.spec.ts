import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { EnduranceComponent } from './en-block.component'

describe('EnduranceComponent', () => {
    
    let component: EnduranceComponent
    let fixture: ComponentFixture<EnduranceComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EnduranceComponent]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(EnduranceComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

})
