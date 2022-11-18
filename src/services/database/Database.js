import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { API_KEY } from '../../constants/envValues';

export class Database {
    constructor() {
        const firebaseConfig = {
            apiKey: API_KEY,
            authDomain: "to-do-list-b0d1c.firebaseapp.com",
            projectId: "to-do-list-b0d1c",
            storageBucket: "to-do-list-b0d1c.appspot.com",
            messagingSenderId: "900825985038",
            appId: "1:900825985038:web:55da9724b536e60baa0c5f",
            measurementId: "G-VNSD5XZXT5"
        };

        const app = initializeApp(firebaseConfig);
        this._database = getFirestore(app);

    }

    create(collectionKey, body) {
        const collectionRef = collection(this._database, collectionKey);
        return addDoc(collectionRef, body)
    }

    read(collectionKey) {
        const collectionRef = collection(this._database, collectionKey);
        return getDocs(collectionRef).then((documents) => {
            return documents.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        });
    }

    update(collectionKey, id, body) { 
        const document = doc(this._database, collectionKey, id);
        return updateDoc(document, body)
    }

    delete(collectionKey, id) { 
        const document = doc(this._database, collectionKey, id);
        return deleteDoc(document)
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}