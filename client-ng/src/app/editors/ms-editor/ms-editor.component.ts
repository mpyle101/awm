import { ChangeDetectorRef, ChangeDetectionStrategy, Component } from '@angular/core'
import { ExerciseDataSource } from '../../data'

@Component({
    selector: 'awm-ms-editor',
    templateUrl: './ms-editor.component.html',
    styleUrls: ['./ms-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaxStrengthEditor {

    public actions
    public _block = {type: 'MS', work: [], actions: []}
    public exercises

    constructor(
        ds: ExerciseDataSource,
        private cdRef: ChangeDetectorRef
    ) {
        ds.connect().subscribe(items => this.exercises = items)
    }

    public onCreateAction(exercise) {
        this.actions = [...this.actions, {key: exercise.key, work: '', unit: exercise.unit}]
    }

    public onDeleteAction(action) {
        this.actions = this.actions.filter(a => a != action)
    }

    get block() {
        return this._block
    }

    set block(block) {
        if (block) {
            this._block = block

            this.actions = this.block.work.reduce((acc, action) => {
                const sets = action.sets.map(set => ({
                    key:   action.key,
                    work:  set.wt ? `${set.count}x${set.wt}x${set.reps}` : `${set.count}x${set.reps}`,
                    unit:  set.wt ? set.unit : 'BW',
                    style: action.style
                }))

                // Because Chrome doesn't support flat or concat.
                sets.map(set => acc.push(set))

                return acc
            }, []) 
        } else {
            this.actions = []
        }

        this.cdRef.markForCheck()
    }
}
