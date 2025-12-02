import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrchid } from '../redux/orchidsSlice';
import { getOrchidImage } from '../utils/imageMapper';
import './OrchidCard.css';

const OrchidCard = ({ orchid, onDetailClick }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleEdit = () => {
        navigate(`/edit/${orchid.id}`);
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${orchid.name}"?`)) {
            await dispatch(deleteOrchid(orchid.id));
        }
    };
    return (
        <div className="orchid-card">
            <div className="orchid-image-container">
                <img
                    src={getOrchidImage(orchid)}
                    alt={orchid.name}
                    className="orchid-image"
                    loading="lazy"
                />
                {orchid.isSpecial && (
                    <div className="special-badge">⭐ Special</div>
                )}
            </div>

            <div className="orchid-info">
                <h3 className="orchid-name">{orchid.name}</h3>
                <p className="orchid-category">{orchid.category}</p>

                <div className="orchid-details">
                    <div className="detail-item">
                        <span className="detail-label">Origin:</span>
                        <span className="detail-value">{orchid.origin}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Color:</span>
                        <span className="detail-value">{orchid.color}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Rating:</span>
                        <span className="detail-value">
                            ⭐ {orchid.rating}/5.0
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value">
                            {orchid.isNatural ? '🌿 Natural' : '🧪 Hybrid'}
                        </span>
                    </div>
                </div>

                <div className="card-buttons">
                    <button
                        className="detail-button modal-btn"
                        onClick={() => onDetailClick(orchid)}
                    >
                        Quick View
                    </button>
                    <Link
                        to={`/detail/${orchid.id}`}
                        className="detail-button detail-link"
                    >
                        Full Details
                    </Link>
                </div>

                {isAuthenticated && (
                    <div className="card-crud-buttons">
                        <button
                            className="crud-btn edit-btn"
                            onClick={handleEdit}
                            title="Edit this orchid"
                        >
                            ✏️ Edit
                        </button>
                        <button
                            className="crud-btn delete-btn"
                            onClick={handleDelete}
                            title="Delete this orchid"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}; export default OrchidCard;