import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  modalCtrl = inject(ModalController);
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);
  alertCtrl = inject(AlertController);

  constructor() { }

  //==Alert
  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
  
    await alert.present();
  }

   //===Loading===
   loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  //===Toast==
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }


  //===Modal===
  //este metodo abre el modal y si existe la informacion la retorna
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const {data} = await modal.onDidDismiss();
    if(data) return data;
  }
  //este otro metodo cierra el modal y si existe la informacion la retorna
  dismissModal(data?: any){
    return this.modalCtrl.dismiss(data);
  }
}
