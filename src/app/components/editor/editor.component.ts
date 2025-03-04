import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FolderService } from '../../services/folder.service';

@Component({
    selector: 'app-editor',
    imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule, SelectModule, InputTextModule],
    templateUrl: './editor.component.html',
    styleUrl: './editor.component.scss',
})
export class EditorComponent {
    fb = inject(FormBuilder);
    folderService = inject(FolderService);

    @Input() set activeNode(node: TreeNode | null) {
        this.selectedNode = node;
        this.patchForm(node?.label || '', node?.icon || '');
    }

    selectedNode: TreeNode | null = null;

    form: FormGroup = this.fb.group({
        label: ['', Validators.required],
        icon: ['', Validators.required],
    });

    fileIconClasses = [
        { label: 'File', value: 'pi pi-file' },
        { label: 'Search', value: 'pi pi-search' },
        { label: 'Star', value: 'pi pi-star' },
    ];

    folderIconClasses = [
        { label: 'Folder', value: 'pi pi-folder' },
        { label: 'Folder Open', value: 'pi pi-folder-open' },
        { label: 'Home', value: 'pi pi-home' },
        { label: 'User', value: 'pi pi-user' },
        { label: 'Cog', value: 'pi pi-cog' },
    ];

    patchForm(label: string, icon: string) {
        this.form.patchValue({
            label,
            icon,
        });
    }

    onSubmit() {
        if (this.form.valid) {
            console.log('Форма отправлена:', this.form.value);
            this.folderService.updateNode(this.selectedNode?.key || '', this.form.value.label, this.form.value.icon);
        }
    }
}
