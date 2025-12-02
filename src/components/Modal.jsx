import { useEffect } from 'react';
import { getOrchidImage } from '../utils/imageMapper';
import './Modal.css';

const Modal = ({ isOpen, onClose, orchid }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !orchid) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    ✕
                </button>

                <div className="modal-body">
                    <div className="modal-image-container">
                        <img
                            src={getOrchidImage(orchid)}
                            alt={orchid.name}
                            className="modal-image"
                        />
                        {orchid.isSpecial && (
                            <div className="modal-special-badge">⭐ Special Orchid</div>
                        )}
                    </div>

                    <div className="modal-info">
                        <h2 className="modal-title">{orchid.name}</h2>
                        <p className="modal-category">{orchid.category} Family</p>

                        <div className="modal-details">
                            <div className="modal-detail-group">
                                <h3>🌍 Origin</h3>
                                <p>{orchid.origin}</p>
                            </div>

                            <div className="modal-detail-group">
                                <h3>🎨 Colors</h3>
                                <p>{orchid.color}</p>
                            </div>

                            <div className="modal-detail-group">
                                <h3>⭐ Rating</h3>
                                <div className="rating-display">
                                    <span className="rating-number">{orchid.rating}</span>
                                    <span className="rating-stars">
                                        {'★'.repeat(Math.floor(orchid.rating))}
                                        {'☆'.repeat(5 - Math.floor(orchid.rating))}
                                    </span>
                                </div>
                            </div>

                            <div className="modal-detail-group">
                                <h3>🌿 Type</h3>
                                <p className={`type-badge ${orchid.isNatural ? 'natural' : 'hybrid'}`}>
                                    {orchid.isNatural ? '🌿 Natural Species' : '🧪 Hybrid Variety'}
                                </p>
                            </div>

                            <div className="modal-detail-group">
                                <h3>📝 Description</h3>
                                <p>
                                    This beautiful {orchid.name} is a {orchid.isNatural ? 'natural' : 'hybrid'} orchid
                                    species from {orchid.origin}. Known for its stunning {orchid.color.toLowerCase()}
                                    blooms, it has earned a rating of {orchid.rating} out of 5 stars from orchid
                                    enthusiasts worldwide.
                                    {orchid.isSpecial && ' This specimen is considered particularly special due to its rare characteristics and exceptional beauty.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;