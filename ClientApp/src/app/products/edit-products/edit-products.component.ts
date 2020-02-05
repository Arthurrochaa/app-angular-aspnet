import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-edit-products',
    templateUrl: './edit-products.component.html',
    styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
    product: Product;
    categories: Array<Category>;
    productId;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private categoryService: CategoryService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.productId = params.get('productId');
        });
        this.categoryService.getCategories().subscribe(c => this.categories = c);
        this.productService.getProductById(this.productId).subscribe(p => {
            this.product = p
            this.bindForm(p);
            this.productService.productForm.markAllAsTouched();
        });
    }

    private bindForm(product: Product) {
        this.productService.formControls['name'].setValue(product.name);
        this.productService.formControls['price'].setValue(product.price);
        this.productService.formControls['description'].setValue(product.description);
    }

    onSubmit() {
        var product = this.productService.createProduct();
        this.productService.updateProduct(this.productId, product).subscribe(data => {
            let snackBarRef = this.snackBar.open(data.name + " foi alterado com sucesso!", "Ok", { duration: 2000, panelClass: "green" });
            snackBarRef.onAction().subscribe(() => {
                snackBarRef.dismiss();
            });
            snackBarRef.afterDismissed().subscribe(() => {
                this.productService.productForm.reset();
                this.router.navigate(['/products']);
            })
        });
    }
}
