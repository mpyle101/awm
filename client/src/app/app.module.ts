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
import { NotFoundComponent }        from './not-found'
import { WorkoutCalendarComponent } from './workout-calendar'
import { WorkoutTableComponent }    from './workout-table'
import { UnderConstruction }        from './under-construction'

import {
    WorkoutListDialog,
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

// Editors
import {
    MaxStrengthEditor
} from './editors'

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

import { CycleDataSource }    from './data'
import { ExerciseDataSource } from './data'
import { WorkoutDataSource }  from './data'

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

    { path: 'workout/:year/:month/:day/ms', component: MaxStrengthEditor },
    { path: 'workout/:year/:month/:day/ms/:id', component: MaxStrengthEditor },
    { path: 'workout/:year/:month/:day', component: UnderConstruction },

    { path: 'dashboard', component: UnderConstruction },
    { path: '**', component: NotFoundComponent }
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
        NotFoundComponent,
        StrengthEnduranceComponent,
        SuperSetComponent,
        TrainingBlockComponent,
        WorkoutCalendarComponent,
        WorkoutTableComponent,
        UnderConstruction,

        // Dialogs
        WorkoutListDialog,
        WorkoutViewDialog,

        // Directives
        DraggableDirective,
        DropzoneDirective,

        // Editors
        MaxStrengthEditor,

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
        WorkoutListDialog,
        WorkoutViewDialog
    ]
})
export class AppModule { }
