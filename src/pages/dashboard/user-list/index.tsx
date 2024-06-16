import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from "../../../configs/firebase";
import TopNav from "../../../components/top-nav";
import SideNav from "../../../components/side-nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

interface User {
    uid: string;
    username: string;
    email: string;
    Role: string;
}

const UserList: React.FC<{}> = () => {
    const [users, setUsers] = useState<User[]>([]); 
    const app = initializeApp(firebaseConfig);
    const [showForm, setShowForm] = useState<boolean>(false);
    const db = getFirestore(app);

    const getUsers = async () => {
        const usersCol = collection(db, 'users');
        const q = query(usersCol, where('Role', '==', 'SuperUser')); 
        const usersSnapshot = await getDocs(q);
        const userList = usersSnapshot.docs.map(doc => doc.data() as User);
        console.log(userList);
        setUsers(userList);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const addUser = async (user: User, password: string) => {
        try {
            const auth = getAuth();
            const { user: authUser } = await createUserWithEmailAndPassword(auth, user.email, password);
            const userDocRef = doc(db, 'users', authUser.uid);
            await setDoc(userDocRef, user);
            console.log("New user added with ID: ", authUser.uid);
            setShowForm(false); 
            getUsers();
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    };

    const deleteUser = async (user: User) => {
        console.log("Deleting user:", user);
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.email === user.email) { 
                    const userDocRef = doc.ref;
                    console.log("Deleting document from Firestore with ID:", doc.id);
                    deleteDoc(userDocRef);
                    console.log("User deleted successfully");
                    return;
                }
            });
            getUsers(); 
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newUser: User = {
            username: formData.get("name") as string,
            email: formData.get("email") as string,
            Role: "SuperUser",
            uid: ""
        };
        const password = formData.get("password") as string;
        addUser(newUser, password);
    };

    return (
        <>
            <TopNav />
            <SideNav />
            <section className="section main-section">
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><FontAwesomeIcon icon={faUser} /></span> 
                            &nbsp;&nbsp;Users
                        </p>
                        <a href="#" className="card-header-icon">
                            <span className="icon"><i className="mdi mdi-reload"></i></span>
                        </a>
                        <div className="card-header-icon" style={{ marginLeft: 'auto' }}>
                            <button className="button is-success" onClick={() => setShowForm(true)}
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className="action-column">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length !== 0 && users.map((user) => (
                                    <tr key={user.uid}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td className="action-column">
                                            <button className="button small red --jb-modal" data-target="sample-modal" type="button" onClick={() => deleteUser(user)}>
                                                <span className="icon"><FontAwesomeIcon icon={faTrash} /></span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {showForm && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Add New User</p>
                            <button className="delete" aria-label="close" onClick={() => setShowForm(false)}></button>
                        </header>
                        <section className="modal-card-body">
                            <form onSubmit={handleFormSubmit}>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input className="input" type="text" name="name" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input className="input" type="email" name="email" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input className="input" type="password" name="password" required />
                                    </div>
                                </div>
                                <footer className="modal-card-foot">
                                    <button type="submit" className="button is-primary"
                                        style={{ border: '2px solid #4CAF50', padding: '10px', borderRadius: '5px' }}>
                                        Submit
                                    </button>
                                    &nbsp;&nbsp;
                                    <button type="button" className="button is-light" onClick={() => setShowForm(false)}
                                        style={{ border: '2px solid #FF0000', padding: '10px', borderRadius: '5px' }}>
                                        Cancel
                                    </button>
                                </footer>
                            </form>
                        </section>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserList;
