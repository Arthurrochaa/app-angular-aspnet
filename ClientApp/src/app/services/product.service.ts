import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SaveProduct } from '../models/save-product.model';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private url = "https://localhost:5001/product/";

    constructor(
        private httpClient: HttpClient,
        private formBuilder: FormBuilder
    ) { }

    productForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(5)]],
        price: ['', Validators.required],
        categoryID: ['', Validators.required]
    })

    get formControls() { return this.productForm.controls; }

    getProducts(): Observable<Array<Product>> {
        return this.httpClient.get<Array<Product>>(this.url).pipe(catchError(this.handleError));
    }

    addProduct(product: SaveProduct): Observable<SaveProduct> {
        return this.httpClient.post<SaveProduct>(this.url, product)
            .pipe(catchError(this.handleError));
    }

    updateProduct(id: number, product: SaveProduct): Observable<SaveProduct> {
        return this.httpClient.put<SaveProduct>(this.url + id, product).pipe(catchError(this.handleError));
    }

    getProductById(id: number): Observable<Product> {
        return this.httpClient.get<Product>(this.url + id).pipe(catchError(this.handleError));
    }

    removeProduct(id: number): Observable<Product> {
        return this.httpClient.delete<Product>(this.url + id).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    };

    createProduct(): SaveProduct {
        var product = new SaveProduct();
        product.name = this.productForm.get('name').value;
        product.description = this.productForm.get('description').value;
        product.price = this.productForm.get('price').value;
        product.categoryID = this.productForm.get('categoryID').value;
        return product;
    }
}
