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

    @Input() activeNode: TreeNode | null = null;

    generateTreeNodes(type: 'files' | 'folders' = 'folders') {
        console.log(this.activeNode);

        if (this.activeNode?.type === 'file') {
            alert('Выберите папку');
            return;
        }
        this.folderService.generateChildren(type, this.activeNode?.key || '');
    }
}
