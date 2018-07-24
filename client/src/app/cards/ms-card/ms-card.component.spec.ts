import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MaxStrengthCard } from './ms-card.component'

describe('MaxStrengthCard', () => {
    
    let component: MaxStrengthCard
    let fixture: ComponentFixture<MaxStrengthCard>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MaxStrengthCard]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(MaxStrengthCard)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

})
