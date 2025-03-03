import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-folder-actions',
    imports: [CommonModule, ButtonModule],
    templateUrl: './folder-actions.component.html',
    styleUrl: './folder-actions.component.scss',
})
export class FolderActionsComponent {
    folderService = inject(FolderService);

    @Input() activeFolder: TreeNode | null = null;

    generateFolders() {
        console.log(this.activeFolder);

        if (!this.activeFolder) {
            return;
        }
        this.folderService.generateTree(this.activeFolder.key!);
    }
}
