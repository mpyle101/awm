import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MaxStrengthComponent } from './ms-block.component'

describe('MaxStrengthComponent', () => {
    
    let component: MaxStrengthComponent
    let fixture: ComponentFixture<MaxStrengthComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MaxStrengthComponent]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(MaxStrengthComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

})
