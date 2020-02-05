import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-register-products',
    templateUrl: './register-products.component.html',
    styleUrls: ['./register-products.component.css']
})
export class RegisterProductsComponent implements OnInit {
    categories: Array<Category>;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.productService.productForm.reset();
        this.categoryService.getCategories().subscribe(c => this.categories = c)
    }

    onSubmit() {
        var product = this.productService.createProduct();
        this.productService.addProduct(product).subscribe(data => {
            let snackBarRef = this.snackBar.open(data.name + " foi adicionado com sucesso!", "Ok", { duration: 2000, panelClass: "green" });
            snackBarRef.onAction().subscribe(() => {
                snackBarRef.dismiss();
            });
            snackBarRef.afterDismissed().subscribe(() => {
                this.productService.productForm.reset();
            })
        });
    }
}
