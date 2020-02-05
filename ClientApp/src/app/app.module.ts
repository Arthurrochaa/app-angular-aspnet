import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProductsComponent } from './products/products.component';
import { RegisterProductsComponent } from './products/register-products/register-products.component';
import { EditProductsComponent } from './products/edit-products/edit-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatIcon } from '@angular/material'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogConfirmDeleteProductComponent } from './products/dialog-confirm-delete-product/dialog-confirm-delete-product.component';
import { RegisterCategoryComponent } from './categories/register-category/register-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { DialogConfirmDeleteCategoryComponent } from './categories/dialog-confirm-delete-category/dialog-confirm-delete-category.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './guards/auth-guard.service';
import { tokenGetter } from './services/user.service';
import { SearchComponent } from './search/search.component';
import { ListFilterPipe } from './pipes/list-filter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        ProductsComponent,
        RegisterProductsComponent,
        EditProductsComponent,
        CategoriesComponent,
        DialogConfirmDeleteProductComponent,
        DialogConfirmDeleteCategoryComponent,
        RegisterCategoryComponent,
        EditCategoryComponent,
        LoginComponent,
        SearchComponent,
        ListFilterPipe,
        MatIcon
    ],
    entryComponents: [
        DialogConfirmDeleteProductComponent,
        DialogConfirmDeleteCategoryComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatSnackBarModule,
        MatCardModule,
        RouterModule.forRoot([
            { path: '', component: LoginComponent, pathMatch: 'full' },
            { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
            { path: 'register-products', component: RegisterProductsComponent, canActivate: [AuthGuard] },
            { path: 'edit-products/:productId', component: EditProductsComponent, canActivate: [AuthGuard] },
            { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
            { path: 'register-category', component: RegisterCategoryComponent, canActivate: [AuthGuard] },
            { path: 'edit-category/:categoryId', component: EditCategoryComponent, canActivate: [AuthGuard] }
        ]),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ["localhost:5001"],
                blacklistedRoutes: []
            }
        }),
        BrowserAnimationsModule
    ],
    providers: [FormBuilder, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
