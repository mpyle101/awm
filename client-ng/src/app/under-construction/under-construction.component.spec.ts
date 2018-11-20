import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { UnderConstruction } from './under-construction.component'

describe('UnderConstruction', () => {
    let component: UnderConstruction
    let fixture: ComponentFixture<UnderConstruction>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UnderConstruction ]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(UnderConstruction)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

})
