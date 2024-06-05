import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductsComponent } from 'src/app/shared/components/add-update-products/add-update-products.component';
import { Productos } from 'src/app/model/producto.model'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  // Utilizando la nueva forma de inyección de dependencias en Angular
  constructor(
    private utilService: UtilsService,
    private fireSvc: FirebaseService
  ) {}

  products: Productos[] = [] 

  ngOnInit() {}

  //===Agregar y Actualizar modal===
  async addUpdateProduct(producto?: Productos) {
    
    let success = await this.utilService.presentModal({
      component: AddUpdateProductsComponent,
      cssClass: 'add-update-modal',
      componentProps: {producto}
    })
    if(success)this.getProductos();
  }

  ionViewWillEnter() {
    this.getProductos();
  }

  //===Obtener Productos===
  getProductos() {
    const path = 'products';

    const sub = this.fireSvc.getDatos(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
        sub.unsubscribe();
      }
    });
  }

  async presentAlertConfirm(producto:Productos) {
    this.utilService.presentAlert({
      header: 'Eliminar!',
      message: '¿Quieres Eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteProduct(producto)
          }
        }
      ]
    });
  
  }

  //===Eliminar producto==
  async deleteProduct(producto: Productos) {


    let path = `products/${producto.id}`;
    
    const loading = await this.utilService.loading();
    await loading.present();

    this.fireSvc.deleteDocument(path).then(async res=>{

        this.products=this.products.filter(p => p.id !== producto.id)

      this.utilService.presentToast({
        message: 'Producto Eliminado exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })

    }).catch(error => {
      console.log(error);

    this.utilService.presentToast({
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
