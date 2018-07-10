import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-csvdropzone',
    templateUrl: './csvdropzone.component.html',
    styleUrls: ['./csvdropzone.component.less']
})
export class CsvDropZoneComponent {
    @Output() public fileSelected: EventEmitter<File> = new EventEmitter<File>();
    public hasError = false;
    public error = '';
    public fileName = '';

    public handleFileDropped(file: File): void {
        this.readCSVFile(file);
        this.fileName = file.name;
    }

    private readCSVFile(file: File): void {
        if (this.validateCSV(file)) {
            this.fileSelected.emit(file);
        }
    }

    private setError(clear: boolean, error: string = ''): void {
        this.hasError = !clear;
        this.error = error;
    }

    private validateCSV(file: File): boolean {
        const nameParts = file.name.split('.');
        if (nameParts.length === 2 && nameParts[1].toLowerCase() === 'csv') {
            this.setError(true);
            return true;
        }
        this.setError(false, `Selected file '${file.name}' is invalid.`);
        return false;
    }

}
