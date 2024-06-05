import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUpdateProductsComponent } from './components/add-update-products/add-update-products.component';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsComponent } from './components/inputs/inputs.component';



@NgModule({
  declarations: [
    AddUpdateProductsComponent,
    HeaderComponent,
    InputsComponent
    ],
  exports: [
    AddUpdateProductsComponent,
    HeaderComponent,
    InputsComponent
    ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
