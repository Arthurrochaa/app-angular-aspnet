import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-dialog-confirm-delete-product',
    templateUrl: './dialog-confirm-delete-product.component.html',
    styleUrls: ['./dialog-confirm-delete-product.component.css']
})
export class DialogConfirmDeleteProductComponent implements OnInit {

    constructor
        (public dialogRef: MatDialogRef<DialogConfirmDeleteProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private productService: ProductService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
    }

    onCancelClick() {
        this.dialogRef.close();
    }

    deleteProduct() {
        let id = this.data.id
        this.productService.removeProduct(id).subscribe(() => {
            this.dialogRef.close();
            let snackBarRef = this.snackBar.open("Removido com sucesso!", "Ok", { duration: 2000, panelClass: "green" });
            snackBarRef.onAction().subscribe(() => {
                snackBarRef.dismiss();
            });
        });
    }

}
