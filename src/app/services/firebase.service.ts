import { Injectable, inject } from '@angular/core';
import { doc, addDoc, collection, collectionData, getFirestore, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  fireStore = inject(AngularFirestore);
  constructor() {}

  //===ADD DOCUMENTO A LA BASE DE DATOS===
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  //==OBTENER DATOS DE LA BASE DE DATOS===
  getDatos(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(),path);
    return collectionData(query(ref, collectionQuery),{idField:'id'});

  }

  
  //==ATUALIZAR DATOS ==
  UpdateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  //==ELIMINAR DATOS ==
  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }






  
}
