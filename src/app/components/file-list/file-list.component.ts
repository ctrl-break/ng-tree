import { Component, Input } from '@angular/core';
import { FileItem } from '../../models/file';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-file-list',
    imports: [CommonModule],
    templateUrl: './file-list.component.html',
    styleUrl: './file-list.component.scss',
})
export class FileListComponent {
    @Input() files: FileItem[] = [];
}
