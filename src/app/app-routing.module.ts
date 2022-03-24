import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from './admin/admin.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ContentadminComponent } from './admin/contentadmin/contentadmin.component';
import { LoginComponent } from './admin/login/login.component';
import { EditItemComponent } from './admin/edit-item/edit-item.component';
import { RegisterComponent } from './admin/register/register.component';
import { AuthGuard } from "./service/auth.guard";
import { CartComponent } from './home/cart/cart.component';


const routes: Routes = [
  //redirec ve home
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'cart',
    component: CartComponent
  },
  {
    path:'admin',
    component: AdminComponent,
    children:[
      {
        path:'',
        component: ContentadminComponent,
        canActivate:[AuthGuard], 
        
      },
      {
        path:'add',
        component: AddProductComponent,
        canActivate:[AuthGuard], 
      },
      {
        path:'register',
        component: RegisterComponent
      },
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'edit',
        component: EditItemComponent,
        canActivate:[AuthGuard], 
      },
      
     
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
