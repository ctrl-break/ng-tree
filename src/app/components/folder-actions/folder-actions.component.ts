import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FolderService, NUMBER_FOR_GEN } from '../../services/folder.service';
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

    NUMBER_FOR_GEN = NUMBER_FOR_GEN;

    @Input() activeFolder: TreeNode | null = null;

    generateTreeNodes(type: 'files' | 'folders' = 'folders') {
        console.log(this.activeFolder);

        if (!this.activeFolder || this.activeFolder.type !== 'folder') {
            alert('Выберите папку');
            return;
        }
        this.folderService.generateChildren(this.activeFolder.key!, type);
    }
}
