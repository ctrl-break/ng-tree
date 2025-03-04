import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NUMBER_FOR_GEN } from './folder.service';

@Injectable({
    providedIn: 'root',
})
export class HelpersService {
    defaultFolderData: TreeNode[] = [
        {
            label: 'Папка 1',
            icon: 'pi pi-folder',
            key: Math.random().toString(),
            type: 'folder',
            children: [
                {
                    label: 'Папка 3',
                    icon: 'pi pi-folder',
                    key: Math.random().toString(),
                    type: 'folder',
                    children: [],
                },
                {
                    label: 'Файл 1',
                    icon: 'pi pi-file',
                    key: Math.random().toString(),
                    type: 'file',
                },
            ],
        },
        {
            label: 'Папка 2',
            icon: 'pi pi-folder',
            key: Math.random().toString(),
            type: 'folder',
            children: [],
        },
    ];

    sortByType(a: TreeNode, b: TreeNode) {
        if (!a.type || !b.type) {
            return 0;
        }
        return b.type.localeCompare(a.type);
    }

    generateRandomItems(type: 'files' | 'folders'): TreeNode[] {
        const items: TreeNode[] = [];
        for (let i = 1; i <= NUMBER_FOR_GEN; i++) {
            const item = this.getItem(type);
            items.push(item);
        }
        return items;
    }

    getItem(type: 'files' | 'folders'): TreeNode {
        const key = Math.random().toString().slice(2);
        if (type === 'files') {
            return {
                label: `Файл ${key}`,
                icon: 'pi pi-file',
                type: 'file',
                key: key,
            };
        }

        return {
            label: `Папка ${key}`,
            icon: 'pi pi-folder',
            key: key,
            type: 'folder',
            children: [],
        };
    }
}
