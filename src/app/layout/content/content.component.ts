import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderTreeComponent } from '../../components/folder-tree/folder-tree.component';

@Component({
    selector: 'app-content',
    imports: [CommonModule, FolderTreeComponent],
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
})
export class ContentComponent {}
