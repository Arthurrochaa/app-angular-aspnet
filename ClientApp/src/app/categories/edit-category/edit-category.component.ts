import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
    categoryId;

    constructor(
        private router: Router,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.categoryId = params.get('categoryId');
        });
        this.categoryService.getCategoryById(this.categoryId).subscribe(c => {
            this.categoryService.formControls.name.setValue(c.name);
        });
    }

    onSubmit() {
        var category = new Category();
        category.name = this.categoryService.formControls.name.value;
        this.categoryService.updateCategory(this.categoryId, category).subscribe(data => {
            let snackBarRef = this.snackBar.open("A categoria foi alterada com sucesso!", "Ok", { duration: 2000, panelClass: "green" });
            snackBarRef.onAction().subscribe(() => {
                snackBarRef.dismiss();
            });
            snackBarRef.afterDismissed().subscribe(() => {
                this.categoryService.categoryForm.reset();
                this.router.navigate(['/categories']);
            })
        });
    }

}
