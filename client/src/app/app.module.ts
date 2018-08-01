// Angular Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FlexLayoutModule } from "@angular/flex-layout"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { LayoutModule } from '@angular/cdk/layout'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// Material Design Modules
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material'
import { MatExpansionModule }  from '@angular/material/expansion'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatMomentDateModule } from '@angular/material-moment-adapter'

import { NgxJsonViewerModule } from 'ngx-json-viewer'

// Application Components
import { AppComponent }             from './app.component'
import { AppIconComponent }         from './app-icon'
import { DashboardComponent }       from './dashboard'
import { WorkoutCalendarComponent } from './workout-calendar'
import { WorkoutDialogComponent }   from './workout-dialog'
import { WorkoutEditorComponent }   from './workout-editor'
import { WorkoutTableComponent }    from './workout-table'
import { UnderConstruction }        from './under-construction'

// Training Blocks
import {
    DayOffComponent,
    EnduranceComponent,
    GeneralConditionComponent,
    HighIntensityComponent,
    HighIntensityGCComponent,
    MaxStrengthComponent,
    StrengthEnduranceComponent,
    SuperSetComponent,
    TrainingBlockComponent
} from './blocks'

// Services
import {
    CurrentDateService,
    DragService,
    ExerciseService,
    MaxStrengthService,
    MomentRangeService,
    WorkoutService
} from './services'

// Directives
import { DraggableDirective } from './directives'
import { DropzoneDirective }  from './directives'

import { ExerciseDataSource } from './data/exercise-datasource'
import { WorkoutDataSource }  from './data/workout-datasource'

// Pipes
import { DurationPipe } from './pipes/duration.pipe'

const app_routes: Routes = [
    { path: '', redirectTo: 'calendar', pathMatch: 'full' },

    { path: 'calendar',  component: WorkoutCalendarComponent },
    { path: 'calendar/:year/:month', component: WorkoutCalendarComponent},

    { path: 'schedule',  component: WorkoutTableComponent },
    { path: 'schedule/:year/:month', component: WorkoutTableComponent },

    { path: 'workout/:year/:month/:day', component: WorkoutEditorComponent },

    { path: 'dashboard', component: UnderConstruction }
]

@NgModule({
    declarations: [
        // Components
        AppComponent,
        AppIconComponent,
        DashboardComponent,
        DayOffComponent,
        EnduranceComponent,
        GeneralConditionComponent,
        HighIntensityComponent,
        HighIntensityGCComponent,
        MaxStrengthComponent,
        StrengthEnduranceComponent,
        SuperSetComponent,
        TrainingBlockComponent,
        WorkoutCalendarComponent,
        WorkoutDialogComponent,
        WorkoutEditorComponent,
        WorkoutTableComponent,
        UnderConstruction,

        // Directives
        DraggableDirective,
        DropzoneDirective,

        // Pipes
        DurationPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        LayoutModule,
        ReactiveFormsModule,
        RouterModule.forRoot(app_routes),

        // Material Modules
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatMomentDateModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,

        NgxJsonViewerModule
    ],
    providers: [
        CurrentDateService,
        DragService,
        ExerciseDataSource,
        ExerciseService,
        MaxStrengthService,
        MomentRangeService,
        WorkoutDataSource,
        WorkoutService
    ],
    bootstrap: [AppComponent],
    entryComponents: [WorkoutDialogComponent]
})
export class AppModule { }
