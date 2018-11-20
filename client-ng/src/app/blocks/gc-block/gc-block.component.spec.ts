import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { TableGeneralConditionComponent } from './gc-block.component'

describe('TableGeneralConditionComponent', () => {
    
    let component: TableGeneralConditionComponent
    let fixture: ComponentFixture<TableGeneralConditionComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableGeneralConditionComponent]
        })
        .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(TableGeneralConditionComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

})
