import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FolderTreeComponent } from '../../components/folder-tree/folder-tree.component';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, FolderTreeComponent],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {}
