import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from "../../../configs/firebase";
import TopNav from "../../../components/top-nav";
import SideNav from "../../../components/side-nav";
import { Route, useNavigate } from "react-router-dom";


const BusList: React.FC<{}> = () => {

    const navigate = useNavigate();
    const [bus, setBus] = useState([]);
    const [region, setRegion] = useState(0);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const getCities = async ( _region: number) => {
        const busCol = collection(db, 'bus');
        const busSnapshot = await getDocs(busCol);
        const busList = busSnapshot.docs.map(doc => doc.data());
        console.log(busList);
        setBus(busList[_region].subcollections)
    }

    useEffect(() => {
        getCities(region);
    }, [])
    return (
        <>
            <TopNav />
            <SideNav />
            <section className="section main-section">
                <div className="notification">
                  <select 
                    className="input" 
                    aria-placeholder="Select region"
                    onChange={(event) => {
                        setRegion(Number(event.target.value));
                        getCities(Number(event.target.value));    
                  }} >
                        <option value={0} >Bizerte</option>
                        <option value={1}>Tunsie</option>
                        <option value={2}>Sousse</option>
                        <option value={3}>Sfax</option>
                  </select>
                </div>
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
                                {bus && bus.length !== 0 && bus.map((item, index) => (
                                    <tr key={index} onClick={() =>{navigate('/station-list/'+item)}}>
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
                                        <td data-label="Name">{item}</td>
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

export default BusList;