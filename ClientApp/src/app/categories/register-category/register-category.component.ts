import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
    selector: 'app-register-category',
    templateUrl: './register-category.component.html',
    styleUrls: ['./register-category.component.css']
})
export class RegisterCategoryComponent implements OnInit {

    constructor(
        private categoryService: CategoryService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.categoryService.categoryForm.reset();
    }

    onSubmit() {
        var category = new Category();
        category.name = this.categoryService.formControls.name.value;
        this.categoryService.addCategory(category).subscribe(data => {
            let snackBarRef = this.snackBar.open("A categoria "+ data.name + " foi adicionada com sucesso!", "Ok", { duration: 2000, panelClass: "green" });
            snackBarRef.onAction().subscribe(() => {
                snackBarRef.dismiss();
            });
            snackBarRef.afterDismissed().subscribe(() => {
                this.categoryService.categoryForm.reset();
            })
        })
    }
}
