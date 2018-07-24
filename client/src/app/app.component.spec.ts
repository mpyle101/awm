import { TestBed, async } from '@angular/core/testing'
import { MatSidenavModule } from '@angular/material/sidenav'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
    let component: AppComponent
    let fixture: ComponentFixture<AppComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatSidenavModule],
            declarations: [AppComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AppComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create the app', async(() => {
        expect(component).toBeTruthy();
    }))

    it(`should have as title 'app'`, async(() => {
        expect(app.title).toEqual('Awesome Workout Manager')
    }))

    it('should render title in a h1 tag', async(() => {
        expect(component.querySelector('h1').textContent).toContain('Awesome Workout Manager')
    }))

})
