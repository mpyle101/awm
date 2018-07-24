import { Injectable } from '@angular/core'


@Injectable({
    providedIn: 'root'
})
export class MaxStrengthService {

    constructor() {}

    public process(block) {
        const eq = (a, b) => a.wt == b.wt && a.reps == b.reps

        const first = block.sets[0]
        const mvmts = block.sets.slice(1).reduce((mvmts, set) => {
            
            let curr = mvmts[mvmts.length - 1]
            if (curr.key == set.key) {
                let curr_set = curr.sets[curr.sets.length - 1]
                if (eq(curr_set, set)) {
                    curr_set.count += 1
                } else {
                    curr.sets.push({wt: set.wt, reps: set.reps, count: 1})
                }
            } else {
                mvmts.push({key: set.key, sets: [{wt: set.wt, reps: set.reps, count: 1}]})
            }

            return mvmts

        }, [{key: first.key, sets: [{wt: first.wt, reps: first.reps, count: 1}]}])

        return mvmts
    }

}
