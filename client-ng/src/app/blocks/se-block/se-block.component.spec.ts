import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { StrengthEnduranceComponent } from './se-block.component'

describe('StrengthEnduranceComponent', () => {
    
    let component: StrengthEnduranceComponent
    let fixture: ComponentFixture<StrengthEnduranceComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StrengthEnduranceComponent]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(StrengthEnduranceComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

})
