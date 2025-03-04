import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { HelpersService } from './helpers.service';

export const NUMBER_FOR_GEN = 50;

@Injectable({
    providedIn: 'root',
})
export class FolderService {
    helpers = inject(HelpersService);

    private tree = new BehaviorSubject<TreeNode[]>(this.helpers.defaultFolderData);
    tree$ = this.tree.asObservable();

    private activeNodeSubject = new BehaviorSubject<TreeNode | null>(null);
    activeNode$ = this.activeNodeSubject.asObservable();

    setActiveNode(node: TreeNode | null) {
        const active = this.findNodeByKey(this.tree.getValue(), node?.key || '');
        this.activeNodeSubject.next(active);
    }

    findNodeByKey(tree: TreeNode[], key: string): TreeNode | null {
        if (!key) {
            return null;
        }
        for (const node of tree) {
            if (node.key === key) {
                return node;
            }

            if (node.children && node.children.length > 0) {
                const foundNode = this.findNodeByKey(node.children, key);
                if (foundNode) {
                    return foundNode;
                }
            }
        }
        return null;
    }

    generateChildren(type: 'files' | 'folders' = 'folders', activeNodeId?: string) {
        const current = this.tree.getValue();
        if (!activeNodeId) {
            return this.addToRoot(type);
        }
        const node = this.findNodeByKey(current, activeNodeId);
        if (!node) {
            return;
        }

        const newItems = this.helpers.generateRandomItems(type);
        const orderedItems = node.children?.length
            ? [...node.children, ...newItems].sort(this.helpers.sortByType)
            : [...newItems].sort(this.helpers.sortByType);

        node.children = orderedItems;
        this.tree.next(current);
    }

    addToRoot(type: 'files' | 'folders' = 'folders') {
        const current = this.tree.getValue();
        const newItems = this.helpers.generateRandomItems(type);
        const orderedItems = [...current, ...newItems].sort(this.helpers.sortByType);
        this.tree.next(orderedItems);
    }

    updateNode(activeNodeId: string, label: string, icon: string) {
        const current = this.tree.getValue();
        const node = this.findNodeByKey(current, activeNodeId);
        if (!node) {
            return;
        }
        node.label = label;
        node.icon = icon;
        this.tree.next(current);
    }
}
