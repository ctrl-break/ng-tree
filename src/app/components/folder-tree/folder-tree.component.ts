import { Component, inject } from '@angular/core';
import { TreeDragDropService } from 'primeng/api';
import { TreeModule, TreeNodeDropEvent, TreeNodeSelectEvent } from 'primeng/tree';
import { FolderService } from '../../services/folder.service';
import { CommonModule } from '@angular/common';
import { combineLatest, tap } from 'rxjs';
import { FolderActionsComponent } from '../folder-actions/folder-actions.component';

@Component({
    selector: 'app-folder-tree',
    imports: [CommonModule, TreeModule, FolderActionsComponent],
    templateUrl: './folder-tree.component.html',
    styleUrls: ['./folder-tree.component.scss'],
    providers: [TreeDragDropService],
})
export class FolderTreeComponent {
    folderService = inject(FolderService);
    nodes$ = combineLatest([this.folderService.tree$, this.folderService.activeNode$]);

    select(nodeEvent: TreeNodeSelectEvent) {
        this.folderService.setActiveNode(nodeEvent.node);
    }

    unselect() {
        this.folderService.setActiveNode(null);
    }

    onNodeDrop(event: TreeNodeDropEvent) {
        console.log(event);
    }
}
