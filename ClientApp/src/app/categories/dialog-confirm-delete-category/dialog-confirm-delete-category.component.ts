import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-dialog-confirm-delete-category',
    templateUrl: './dialog-confirm-delete-category.component.html',
    styleUrls: ['./dialog-confirm-delete-category.component.css']
})
export class DialogConfirmDeleteCategoryComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogConfirmDeleteCategoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private categoryService: CategoryService,
        private snackBar: MatSnackBar

    ) { }

    ngOnInit() {
    }

    onCancelClick() {
        this.dialogRef.close();
    }

    deleteCategory() {
        let id = this.data.id
        this.categoryService.removeCategory(id).subscribe(() => {
            this.dialogRef.close();
            let snackBarRef = this.snackBar.open("Removido com sucesso!", "Ok", { duration: 2000, panelClass: "green" });
            snackBarRef.onAction().subscribe(() => {
                snackBarRef.dismiss();
            });
        });
    }

}
