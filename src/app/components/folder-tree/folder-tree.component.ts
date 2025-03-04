import { Component, inject } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { FolderService } from '../../services/folder.service';
import { CommonModule } from '@angular/common';
import { combineLatest, tap } from 'rxjs';
import { FolderActionsComponent } from '../folder-actions/folder-actions.component';

@Component({
    selector: 'app-folder-tree',
    imports: [CommonModule, TreeModule, FolderActionsComponent],
    templateUrl: './folder-tree.component.html',
    styleUrls: ['./folder-tree.component.scss'],
})
export class FolderTreeComponent {
    folderService = inject(FolderService);
    folders$ = combineLatest([this.folderService.tree$, this.folderService.activeNode$]);

    selected: TreeNode | null = null;

    toggleActive() {
        this.folderService.setActiveNode(this.selected);
    }
}
