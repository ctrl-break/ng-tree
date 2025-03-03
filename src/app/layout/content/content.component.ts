import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderService } from '../../services/folder.service';
import { FileListComponent } from '../../components/file-list/file-list.component';

@Component({
    selector: 'app-content',
    imports: [CommonModule, FileListComponent],
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
    folderService = inject(FolderService);
    activeFolder$ = this.folderService.activeFolder$;
}
