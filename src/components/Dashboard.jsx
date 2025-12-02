import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrchids, deleteOrchid } from '../redux/orchidsSlice';
import { useNavigate } from 'react-router-dom';
import { getOrchidImage } from '../utils/imageMapper';
import Navigation from './Navigation';
import './Dashboard.css';

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading } = useSelector((state) => state.orchids);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchOrchids());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this orchid?')) {
            await dispatch(deleteOrchid(id));
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleAdd = () => {
        navigate('/add');
    };

    const filteredOrchids = items.filter(orchid =>
        orchid.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isAuthenticated) {
        return (
            <div className="dashboard-container">
                <Navigation />
                <div className="auth-warning">
                    <h2>🔒 Authentication Required</h2>
                    <p>Please login to access the dashboard</p>
                    <button onClick={() => navigate('/login')} className="login-redirect-btn">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <Navigation />
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1 style={{ paddingTop: '50px' }}>🌺 Orchid Management Dashboard</h1>
                    <div className="dashboard-actions">
                        <input
                            type="text"
                            placeholder="Search orchids..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button onClick={handleAdd} className="add-btn">
                            + Add New Orchid
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Loading orchids...</div>
                ) : (
                    <div className="orchids-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Origin</th>
                                    <th>Color</th>
                                    <th>Rating</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrchids.map((orchid) => (
                                    <tr key={orchid.id}>
                                        <td>
                                            <img src={getOrchidImage(orchid)} alt={orchid.name} className="table-img" />
                                        </td>
                                        <td>{orchid.name}</td>
                                        <td>{orchid.origin}</td>
                                        <td>{orchid.color}</td>
                                        <td>⭐ {orchid.rating}</td>
                                        <td>{orchid.category}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button onClick={() => handleEdit(orchid.id)} className="edit-btn">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(orchid.id)} className="delete-btn">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
