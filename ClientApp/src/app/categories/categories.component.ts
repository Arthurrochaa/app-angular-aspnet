import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogConfirmDeleteCategoryComponent } from './dialog-confirm-delete-category/dialog-confirm-delete-category.component';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    categories: Array<Category>;
    columnsToDisplay = ['id', 'name', 'edit', 'delete'];

    constructor(
        private categoryService: CategoryService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(c => this.categories = c);
    }

    openConfirmDialog(id: number) {
        const dialogRef = this.dialog.open(DialogConfirmDeleteCategoryComponent, {
            width: '360px',
            data: { id: id }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.ngOnInit();
        });
    }
}
