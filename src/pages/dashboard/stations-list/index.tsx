import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from "../../../configs/firebase";
import TopNav from "../../../components/top-nav";
import SideNav from "../../../components/side-nav";
import { useParams } from "react-router-dom";


const StationsList: React.FC<{}> = () => {

    const params = useParams();
    const [stations, setStations] = useState<any>([]);
    const [region, setRegion] = useState(0);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const getStations = async (_region: any) => {
        try {
          console.log("getStations: ", _region);
          const busCol = collection(db, 'bus');
          const busSnapshot = await getDocs(busCol);
          const busList = busSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
          console.log(busList);
      
          if (_region >= 0 && _region < busList.length) {
            const busDocId = busList[_region].id;
            const subCollectionRef = collection(db, 'bus', busDocId, ''+params.id);
            const subCollectionSnapshot = await getDocs(subCollectionRef);
            const subCollectionList = subCollectionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
            console.log(subCollectionList);
            setStations(subCollectionList);
            return subCollectionList;
          } else {
            console.error('Region index out of bounds');
            return [];
          }
        } catch (error) {
          console.error('Error fetching sub-collection:', error);
          return [];
        }
      };

    useEffect(() => {
        console.log(params.id)
        getStations(region);
    }, [])
    return (
        <>
            <TopNav />
            <SideNav />
            <section className="section main-section">
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                            Clients
                        </p>
                        <a href="#" className="card-header-icon">
                            <span className="icon"><i className="mdi mdi-reload"></i></span>
                        </a>
                    </header>
                    <div className="card-content">
                        <table>
                            <thead>
                                <tr>
                                    <th className="checkbox-cell">
                                        <label className="checkbox">
                                            <input type="checkbox" />
                                            <span className="check"></span>
                                        </label>
                                    </th>
                                    <th className="image-cell"></th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>City</th>
                                    <th>Progress</th>
                                    <th>Created</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {stations && stations.length !== 0 && stations.map((item: any) => (
                                    <tr key={item.id}>
                                        <td className="checkbox-cell">
                                            <label className="checkbox">
                                                <input type="checkbox" />
                                                <span className="check"></span>
                                            </label>
                                        </td>
                                        <td className="image-cell">
                                            <div className="image">
                                                <img src="https://avatars.dicebear.com/v2/initials/ryley-wuckert.svg" className="rounded-full" />
                                            </div>
                                        </td>
                                        <td data-label="Name">{item.id}</td>
                                        <td data-label="Company">Heller-Little</td>
                                        <td data-label="City">Emeraldtown</td>
                                        <td data-label="Progress" className="progress-cell">
                                            <progress max="100" value="54">54</progress>
                                        </td>
                                        <td data-label="Created">
                                            <small className="text-gray-500" title="Jun 28, 2021">Jun 28, 2021</small>
                                        </td>
                                        <td className="actions-cell">
                                            <div className="buttons right nowrap">
                                                <button className="button small green --jb-modal" data-target="sample-modal-2" type="button">
                                                    <span className="icon"><i className="mdi mdi-eye"></i></span>
                                                </button>
                                                <button className="button small red --jb-modal" data-target="sample-modal" type="button">
                                                    <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))

                                }

                            </tbody>
                        </table>
                        <div className="table-pagination">
                            <div className="flex items-center justify-between">
                                <div className="buttons">
                                    <button type="button" className="button active">1</button>
                                    <button type="button" className="button">2</button>
                                    <button type="button" className="button">3</button>
                                </div>
                                <small>Page 1 of 3</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StationsList;