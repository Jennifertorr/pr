import { Component, Input, OnInit } from '@angular/core';
import {inject } from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Productos } from 'src/app/model/producto.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-add-update-products',
  templateUrl: './add-update-products.component.html',
  styleUrls: ['./add-update-products.component.scss'],
})
export class AddUpdateProductsComponent  implements OnInit {

  @Input() producto: Productos;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    tipo: new FormControl('', [Validators.required, Validators.minLength(4)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(4)]),



  });

  //==INYECTAR SERVICIO DE FIREBASE
  fireBaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
    if(this.producto) this.form.setValue(this.producto)
  }

  submit(){

    if(this.form.valid){

      if(this.producto)this.updateProduct();
      else this.createProduct()

    }

    
     
  }


  //==Crear Producto==

  async createProduct() {

      let path = 'products';
      
      const loading = await this.utilsSvc.loading();
      await loading.present();

      delete this.form.value.id;

      this.fireBaseSvc.addDocument(path, this.form.value ).then(async res=>{

        this.utilsSvc.dismissModal({success : true })

        this.utilsSvc.presentToast({
          message: 'Producto creado exitosamente',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        })

      }).catch(error => {
        console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })

      }).finally(()=> {
        loading.dismiss()
      })

    
    
  }

 //===Actualizar producto==
  async updateProduct() {


      let path = `products/${this.producto.id}`;
      
      const loading = await this.utilsSvc.loading();
      await loading.present();

      delete this.form.value.id;

      this.fireBaseSvc.UpdateDocument(path, this.form.value ).then(async res=>{

        this.utilsSvc.dismissModal({success : true })

        this.utilsSvc.presentToast({
          message: 'Producto Actualizado exitosamente',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        })

      }).catch(error => {
        console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })

      }).finally(()=> {
        loading.dismiss()
      })

    
    
  }


}
