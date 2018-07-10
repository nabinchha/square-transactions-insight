import { Directive, HostListener, EventEmitter, ElementRef, Renderer2, Output} from '@angular/core';


@Directive({
    selector: '[appDropzone]'
})
export class DropzoneDirective {
    @Output() public fileDropped: EventEmitter<File> = new EventEmitter<File>();

    public constructor(private element: ElementRef,
                       private renderer: Renderer2) {
        this.activateDragEffect(false);
    }

    @HostListener('drop', ['$event'])
    public handleFileDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        if (files.length === 1) {
            this.fileDropped.emit(files[0]);
            this.activateDragEffect(false);
        }
    }

    @HostListener('dragover', ['$event'])
    public onDragOver(event: DragEvent) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    @HostListener('dragenter')
    public onDragEnter() {
        this.activateDragEffect(true);
    }

    @HostListener('dragleave')
    public onDragLeave() {
        this.activateDragEffect(false);
    }

    @HostListener('dragexit')
    public onDragExit() {
        this.activateDragEffect(false);
    }

    private activateDragEffect(activate: boolean): void {
        const opacity = activate ? '1' : '0.5';
        const scale = activate ? 1.05 : 1;
        this.renderer.setStyle(this.element.nativeElement, 'opacity', opacity);
        this.renderer.setStyle(this.element.nativeElement, 'transform', `scale(${scale})`);
        this.renderer.setStyle(this.element.nativeElement, 'transition', `all 0.75s`);
    }
}
