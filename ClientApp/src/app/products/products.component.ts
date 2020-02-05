import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogConfirmDeleteProductComponent } from './dialog-confirm-delete-product/dialog-confirm-delete-product.component';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: Array<Product>;
    columnsToDisplay = ['id', 'name', 'description', 'categoryName', 'price', 'edit', 'delete'];

    constructor(
        private productService: ProductService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.productService.getProducts().subscribe((p: Array<Product>) => this.products = p);
    }

    openConfirmDialog(id: number) {
        const dialogRef = this.dialog.open(DialogConfirmDeleteProductComponent, {
            width: '360px',
            data: { id: id }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }
}
