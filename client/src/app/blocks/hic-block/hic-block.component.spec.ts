import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HighIntensityComponent } from './hic-block.component'

describe('HighIntensityComponent', () => {
    
    let component: HighIntensityComponent
    let fixture: ComponentFixture<HighIntensityComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HighIntensityComponent]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(HighIntensityComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

})
