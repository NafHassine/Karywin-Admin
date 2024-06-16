import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';
import { firebaseConfig } from "../../../configs/firebase";
import TopNav from "../../../components/top-nav";
import SideNav from "../../../components/side-nav";
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
);
interface AlertData {
    date: string;
    count: number;
}

const Home: React.FC<{}> = () => {
    const [userCount, setUserCount] = useState<number>(0);
    const [superUserCount, setSuperUserCount] = useState<number>(0);
    const [regionCount, setRegionCount] = useState<number>(0);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [alertLabels, setAlertLabels] = useState<string[]>([]);
    const [alertCounts, setAlertCounts] = useState<number[]>([]);


    const data = {
        labels: ['Super user', 'User'],
        datasets: [
            {
                label: 'Users',
                data: [superUserCount, userCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Alerts',
            },
        },
        scales: {
            y: {
                display: true,
                title: {
                    display: true,
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    max: Math.max(...alertCounts) + 4,
                }
            }
        }
    };


    const data2 = {
        labels: alertLabels,
        datasets: [
            {
                label: 'Alerts',
                data: alertCounts,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const fetchCounts = async () => {
        const usersCol = collection(db, 'users');

        // Count users with role 'User'
        const userQuery = query(usersCol, where('Role', '==', 'User'));
        const userSnapshot = await getDocs(userQuery);
        setUserCount(userSnapshot.size);

        // Count users with role 'SuperUser'
        const superUserQuery = query(usersCol, where('Role', '==', 'SuperUser'));
        const superUserSnapshot = await getDocs(superUserQuery);
        setSuperUserCount(superUserSnapshot.size);

        // Count regions from the 'bus' collection
        const busCol = collection(db, 'bus');
        const busSnapshot = await getDocs(busCol);
        setRegionCount(busSnapshot.size);

        // Fetch alert data
        const alertsCol = collection(db, 'alerts', 'Ain Mariem', 'count');
        const alertsSnapshot = await getDocs(alertsCol);
        const alertsData: AlertData[] = [];
        alertsSnapshot.forEach(doc => {
            alertsData.push({ date: doc.id, count: doc.data().number });
        });

        const sortedAlertsData = alertsData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setAlertLabels(sortedAlertsData.map(alert => alert.date));
        setAlertCounts(sortedAlertsData.map(alert => alert.count));
    }

    useEffect(() => {
        fetchCounts();
    }, []);

    return (
        <>
            <TopNav />
            <SideNav />
            <div>
                <section className="is-title-bar">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                        <ul>
                            <li>Admin</li>
                            <li>Dashboard</li>
                        </ul>
                    </div>
                </section>

                <section className="is-hero-bar">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                        <h1 className="title">
                            Dashboard
                        </h1>
                    </div>
                </section>

                <section className="section main-section">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
                        <div className="card">
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>
                                            Users
                                        </h3>
                                        <h1>
                                            {userCount}
                                        </h1>
                                    </div>
                                    <span className="icon widget-icon text-green-500"><i className="mdi mdi-account-multiple mdi-48px"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>
                                            Super Users
                                        </h3>
                                        <h1>
                                            {superUserCount}
                                        </h1>
                                    </div>
                                    <span className="icon widget-icon text-blue-500"><i className="mdi mdi-account-star mdi-48px"></i></span>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content">
                                <div className="flex items-center justify-between">
                                    <div className="widget-label">
                                        <h3>
                                            Regions
                                        </h3>
                                        <h1>
                                            {regionCount}
                                        </h1>
                                    </div>
                                    <span className="icon widget-icon text-red-500"><i className="mdi mdi-map mdi-48px"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-6">
                        <header className="card-header">
                            <p className="card-header-title">
                                <span className="icon"><i className="mdi mdi-finance"></i></span>
                                Performance
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="chart-area">
                                <div className="h-full " style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {/* Performance chart should be rendered here */}
                                    <div style={{ width: '40%' }}>
                                        <Doughnut data={data} />;
                                    </div>
                                    <div style={{ width: '60%' }}>
                                        <Line options={options} data={data2} />;
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </>
    );
}

export default Home;
