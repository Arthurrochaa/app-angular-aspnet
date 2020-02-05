import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../models/category.model';
import { FormBuilder, Validators } from '@angular/forms';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private url = "https://localhost:5001/category/";

    constructor(
        private httpClient: HttpClient,
        private formBuilder: FormBuilder
    ) { }

    categoryForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]]
    })

    get formControls() { return this.categoryForm.controls; }

    getCategories() {
        return this.httpClient.get<Array<Category>>(this.url);
    }

    addCategory(category: Category): Observable<Category> {
        console.log(category)
        return this.httpClient.post<Category>(this.url, category)
            .pipe(catchError(this.handleError));
    }

    getCategoryById(id: number): Observable<Category> {
        return this.httpClient.get<Category>(this.url + id).pipe(catchError(this.handleError));
    }

    updateCategory(id: number, category: Category): Observable<Category> {
        return this.httpClient.put<Category>(this.url + id, category).pipe(catchError(this.handleError));
    }

    removeCategory(id: number): Observable<Category> {
        return this.httpClient.delete<Category>(this.url + id).pipe(catchError(this.handleError));
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
}
