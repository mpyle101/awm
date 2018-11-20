import { ChangeDetectorRef, ChangeDetectionStrategy, Component } from '@angular/core'
import { ExerciseDataSource } from '../../data'

@Component({
    selector: 'awm-hic-editor',
    templateUrl: './hic-editor.component.html',
    styleUrls: ['./hic-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighIntensityEditor {

    public distance
    public key
    public meta
    public style
    public work

    public exercises

    constructor(
        ds: ExerciseDataSource,
        private cdRef: ChangeDetectorRef
    ) {
        ds.connect().subscribe(items => this.exercises = items)
    }

    set block(block) {
        if (block) {
            this.key   = block.key
            this.meta  = block.meta
            this.work  = block.work
            this.style = block.style
        }

        this.cdRef.markForCheck()
    }

}
