import { Directive, HostBinding, HostListener, Input } from '@angular/core'
import { DragService } from '../services'

@Directive({
    selector: '[awm-draggable]'
})
export class DraggableDirective {

    @Input('awm-draggable') data = {}
    @Input('awm-dropzone')  zone: string

    // Enable HTML 5 drag and drop
    @HostBinding('draggable') draggable = () => true

    @HostListener('dragstart', ['$event'])
    onDragStart(event) {
        this.service.zone = this.zone
        event.dataTransfer.setData('text/plain', JSON.stringify(this.data))
        event.effectAllowed = 'copy'
    }

    constructor(private service: DragService) {}

}
