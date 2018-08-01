import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core'
import { DragService } from '../services'

@Directive({
    selector: '[awm-droppable]'
})
export class DroppableDirective {

    @Input('awm-droppable') data = {}
    @Input('awm-dropzone')  zone: string
    @Output('awm-dropped') dropped = new EventEmitter()

    // Enable HTML 5 drag and drop
    @HostBinding('draggable') draggable = () => true

    @HostListener('dragenter', ['$event'])
    @HostListener('dragover',  ['$event'])
    onDragOver(event) {
        if (this.service.accepts(this.zone)) {
            event.preventDefault()
        }
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        const data = event.dataTransfer.getData('text/plain')
        this.dropped.emit(data)
    }

    constructor(private service: DragService) {}

}
