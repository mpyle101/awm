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
import { MatDividerModule }    from '@angular/material/divider'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatSnackBarModule }   from '@angular/material/snack-bar'

import { DragulaModule } from 'ng2-dragula'
import { NgxJsonViewerModule } from 'ngx-json-viewer'

// Application Components
import { AppComponent }             from './app.component'
import { AppIconComponent }         from './app-icon'
import { DashboardComponent }       from './dashboard'
import { WorkoutCalendarComponent } from './workout-calendar'
import { WorkoutEditorComponent }   from './workout-editor'
import { WorkoutTableComponent }    from './workout-table'
import { UnderConstruction }        from './under-construction'

import {
    WorkoutViewDialog
} from './dialogs'

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
    HttpService,
    MomentRangeService,
    WorkoutService
} from './services'

// Directives
import { DraggableDirective } from './directives'
import { DropzoneDirective }  from './directives'

import { CycleDataSource }    from './data/cycle-datasource'
import { ExerciseDataSource } from './data/exercise-datasource'
import { WorkoutDataSource }  from './data/workout-datasource'

// Pipes
import {
    BlockIconPipe,
    BlockLabelPipe,
    DurationPipe
} from './pipes'

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
        WorkoutEditorComponent,
        WorkoutTableComponent,
        UnderConstruction,

        // Dialogs
        WorkoutViewDialog,

        // Directives
        DraggableDirective,
        DropzoneDirective,

        // Pipes
        BlockIconPipe,
        BlockLabelPipe,
        DurationPipe
    ],
    imports: [
        // Angular Modules
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
        MatDividerModule,
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
        MatSnackBarModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,

        // Third party modules
        DragulaModule.forRoot(),
        NgxJsonViewerModule
    ],
    providers: [
        // Services
        CurrentDateService,
        DragService,
        HttpService,
        MomentRangeService,
        WorkoutService,

        // Data Sources
        CycleDataSource,
        ExerciseDataSource,
        WorkoutDataSource
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        WorkoutViewDialog
    ]
})
export class AppModule { }
