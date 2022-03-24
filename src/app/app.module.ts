import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { HeaderComponent } from './home/header/header.component';
import { ContentComponent } from './home/content/content.component';
import { FooterComponent } from './home/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './admin/menu/menu.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ContentadminComponent } from './admin/contentadmin/contentadmin.component';
import { FooteradminComponent } from './admin/footeradmin/footeradmin.component';
import { LoginComponent } from './admin/login/login.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditItemComponent } from './admin/edit-item/edit-item.component';
import { RegisterComponent } from './admin/register/register.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CartComponent } from './home/cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    AdminComponent,
    MenuComponent,
    SidebarComponent,
    ContentadminComponent,
    FooteradminComponent,
    LoginComponent,
    AddProductComponent,
    EditItemComponent,
    RegisterComponent,
    CartComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthGuardModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    AngularFireAuthModule
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
