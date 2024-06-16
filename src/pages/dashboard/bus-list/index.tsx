import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from "../../../configs/firebase";
import TopNav from "../../../components/top-nav";
import SideNav from "../../../components/side-nav";
import { Route, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faEdit, faList, faTrash } from '@fortawesome/free-solid-svg-icons'; 


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
                        <option value={1}>Sfax</option>
                        <option value={2}>Sousse</option>
                        <option value={3}>Tunis</option>
                  </select>
                </div>
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                        <span className="icon"><FontAwesomeIcon icon={faBus} /></span> 
                        &nbsp;&nbsp;Routes
                        </p>
                        <a href="#" className="card-header-icon">
                            <span className="icon"><i className="mdi mdi-reload"></i></span>
                        </a>
                    </header>
                    <div className="card-content">
                        <table>
                            <thead>
                                <tr>
                                    <th className="image-cell"></th>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bus && bus.length !== 0 && bus.map((item, index) => (
                                    <tr key={index} onClick={() =>{
                                        navigate(`/stations/${region}/${item}`);}}>
                                        <td className="image-cell">
                                            <FontAwesomeIcon icon={faList} /> 
                                        </td>
                                        <td data-label="Name">{item}</td>
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