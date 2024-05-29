import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from "../../../configs/firebase";


const UserList: React.FC<{}> = () => {

    const [bus, setBus] = useState([]);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const  getCities = async () => {
        const busCol = collection(db, 'bus');
        const busSnapshot = await getDocs(busCol);
        const busList = busSnapshot.docs.map(doc => doc.data());
        console.log(busList );
        setBus(busList[0].subcollections)
      }

      useEffect(() =>{
        getCities();
      }, [])
    return (<></>
    );
};

export default UserList;