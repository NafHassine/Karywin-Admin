import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from "../../../configs/firebase";
import TopNav from "../../../components/top-nav";
import SideNav from "../../../components/side-nav";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faEdit, faList, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'; 

const StationsList: React.FC<{}> = () => {
    const params = useParams<{ region: string, id: string }>();
    const [stations, setStations] = useState<any[]>([]);
    const [region, setRegion] = useState<number>(parseInt(params.region || "0"));
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [newStation, setNewStation] = useState({ id: '', latitude: '', longitude: '' });
    const [editingStation, setEditingStation] = useState<any>(null);

    const getStations = async (_region: any) => {
        try {
            console.log("getStations: ", _region);
            const busCol = collection(db, 'bus');
            const busSnapshot = await getDocs(busCol);
            const busList = busSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
            console.log(busList);
        
            if (_region >= 0 && _region < busList.length) {
                const busDocId = busList[_region].id;
                console.log(`Accessing sub-collection for region ${_region} with busDocId: ${busDocId} and sub-collection: ${params.id}`);
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

    const handleAddStation = async () => {
        try {
            const busCol = collection(db, 'bus');
            const busSnapshot = await getDocs(busCol);
            const busList = busSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (region >= 0 && region < busList.length) {
                const busDocId = busList[region].id;
                const subCollectionRef = collection(db, 'bus', busDocId, '' + params.id);
                await setDoc(doc(subCollectionRef, newStation.id), {
                    latitude: newStation.latitude,
                    longitude: newStation.longitude
                });
                setShowForm(false);
                setNewStation({ id: '', latitude: '', longitude: '' });
                getStations(region); 
            } else {
                console.error('Region index out of bounds');
            }
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };

    const handleEditStation = async () => {
        try {
            const busCol = collection(db, 'bus');
            const busSnapshot = await getDocs(busCol);
            const busList = busSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (region >= 0 && region < busList.length) {
                const busDocId = busList[region].id;
                const subCollectionRef = collection(db, 'bus', busDocId, '' + params.id);
                await setDoc(doc(subCollectionRef, editingStation.id), {
                    latitude: editingStation.latitude,
                    longitude: editingStation.longitude
                });
                setEditingStation(null);
                getStations(region); 
            } else {
                console.error('Region index out of bounds');
            }
        } catch (error) {
            console.error('Error editing document:', error);
        }
    };

    const handleDeleteStation = async (id: string) => {
        try {
            const busCol = collection(db, 'bus');
            const busSnapshot = await getDocs(busCol);
            const busList = busSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (region >= 0 && region < busList.length) {
                const busDocId = busList[region].id;
                const subCollectionRef = collection(db, 'bus', busDocId, '' + params.id);
                await deleteDoc(doc(subCollectionRef, id));
                getStations(region); 
            } else {
                console.error('Region index out of bounds');
            }
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    useEffect(() => {
        console.log(params.id);
        getStations(region);
    }, [params.id, region]);

    return (
        <>
            <TopNav />
            <SideNav />
            <section className="section main-section">
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><FontAwesomeIcon icon={faBus} /></span>
                            &nbsp;&nbsp; Stations 
                        </p>
                        <a href="#" className="card-header-icon">
                            <span className="icon"><i className="mdi mdi-reload"></i></span>
                        </a>
                        <div className="card-header-icon" style={{ marginLeft: 'auto' }}>
                            <button className="button is-success" onClick={() =>{ setShowForm(true); console.log('showForm state:', showForm); }}
                                style={{ border: '2px solid #4CAF50', padding: '10px', borderRadius: '5px' }}>
                                <span className="icon"><FontAwesomeIcon icon={faPlus} /></span>
                                <span>Add </span>
                            </button>
                        </div>
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
                                {stations && stations.length !== 0 && stations.map((item: any) => (
                                    <tr key={item.id}>
                                        <td className="image-cell">
                                            <FontAwesomeIcon icon={faList} /> {/* Font Awesome icon */}
                                        </td>
                                        <td data-label="Name">{item.id}</td>
                                        <td className="actions-cell">
                                            <div className="buttons right nowrap">
                                                <button className="button small green --jb-modal" data-target="sample-modal-2" type="button"
                                                    onClick={() => setEditingStation(item)}>
                                                    <span className="icon"><FontAwesomeIcon icon={faEdit} /></span>
                                                </button>
                                                <button className="button small red --jb-modal" data-target="sample-modal" type="button"
                                                    onClick={() => handleDeleteStation(item.id)}>
                                                    <span className="icon"><FontAwesomeIcon icon={faTrash} /></span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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

            {showForm && (
                console.log('Modal should be visible'),
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Add New Station</p>
                            <button className="delete" aria-label="close" onClick={() => setShowForm(false)}></button>
                        </header>
                        <section className="modal-card-body">
                            <form>
                                <div className="field">
                                    <label className="label">Station Name</label>
                                    <div className="control">
                                        <input className="input" type="text" value={newStation.id} onChange={(e) => setNewStation({ ...newStation, id: e.target.value })} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Latitude</label>
                                    <div className="control">
                                        <input className="input" type="text" value={newStation.latitude} onChange={(e) => setNewStation({ ...newStation, latitude: e.target.value })} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Longitude</label>
                                    <div className="control">
                                        <input className="input" type="text" value={newStation.longitude} onChange={(e) => setNewStation({ ...newStation, longitude: e.target.value })} />
                                    </div>
                                </div>
                            </form>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={handleAddStation}>Add Station</button>
                            <button className="button" onClick={() => setShowForm(false)}>Cancel</button>
                        </footer>
                    </div>
                </div>
            )}

            {editingStation && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Edit Station</p>
                            <button className="delete" aria-label="close" onClick={() => setEditingStation(null)}></button>
                        </header>
                        <section className="modal-card-body">
                            <form>
                                <div className="field">
                                    <label className="label">Station Name</label>
                                    <div className="control">
                                        <input className="input" type="text" value={editingStation.id} readOnly />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Latitude</label>
                                    <div className="control">
                                        <input className="input" type="text" value={editingStation.latitude} onChange={(e) => setEditingStation({ ...editingStation, latitude: e.target.value })} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Longitude</label>
                                    <div className="control">
                                        <input className="input" type="text" value={editingStation.longitude} onChange={(e) => setEditingStation({ ...editingStation, longitude: e.target.value })} />
                                    </div>
                                </div>
                            </form>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={handleEditStation}>Save Changes</button>
                            <button className="button" onClick={() => setEditingStation(null)}>Cancel</button>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
};

export default StationsList;
