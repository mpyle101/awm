import { DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, Observable } from 'rxjs'

interface Movement {
    key: string
    sets: any[]
}

/**
 * Data source for the block view.
 */
export class BlockDataSource extends DataSource<Movement> {

    private blockSubject = new BehaviorSubject<Movement[]>([])

    constructor(block) {
        super()

        this.blockSubject.next(block.work)
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<Movement[]> {
        return this.blockSubject.asObservable()
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {
        this.blockSubject.complete()
    }

}
