import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { EditorComponent } from '../../components/editor/editor.component';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, EditorComponent],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    folderService = inject(FolderService);
    activeNode$ = this.folderService.activeNode$;
}
