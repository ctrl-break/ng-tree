import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeNode } from 'primeng/api';

export const DEFAULT_NUMBER_FOR_GENERATE_TREE = 50;

@Injectable({
    providedIn: 'root',
})
export class FolderService {
    private defaultFolderData: TreeNode[] = [
        {
            label: 'Папка 1',
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            key: Math.random().toString(),
            children: [
                {
                    label: 'Папка 3',
                    expandedIcon: 'pi pi-folder-open',
                    collapsedIcon: 'pi pi-folder',
                    key: Math.random().toString(),
                    children: [],
                },
            ],
        },
        {
            label: 'Папка 2',
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            key: Math.random().toString(),
            children: [],
        },
    ];

    private folders = new BehaviorSubject<TreeNode[]>(this.defaultFolderData);
    folders$ = this.folders.asObservable();

    private activeFolderSubject = new BehaviorSubject<TreeNode | null>(null);
    private activeFolderFilesSubject = new BehaviorSubject<string[]>([]);

    activeFolder$ = this.activeFolderSubject.asObservable();
    activeFolderFiles$ = this.activeFolderFilesSubject.asObservable();

    setActiveFolder(folder: TreeNode | null) {
        this.activeFolderSubject.next(folder);
    }

    findNodeByKey(tree: TreeNode[], key: string): TreeNode | null {
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

    generateRandomFolders(): TreeNode[] {
        const folders: any[] = [];

        for (let i = 1; i <= 50; i++) {
            const key = Math.random().toString().slice(2);
            const folder = {
                label: `Папка ${key}`,
                expandedIcon: 'pi pi-folder-open',
                collapsedIcon: 'pi pi-folder',
                key: key,
                children: [],
            };
            folders.push(folder);
        }

        return folders;
    }

    generateTree(activeNodeId: string) {
        const current = this.folders.getValue();
        const node = this.findNodeByKey(current, activeNodeId);
        if (node) {
            node.children = node.children?.length ? [...node.children, ...this.generateRandomFolders()] : [...this.generateRandomFolders()];
            console.log(node, current);

            this.folders.next(current);
        }
    }
}
