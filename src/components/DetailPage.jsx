import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ListOfOrchids from '../data/ListOfOrchids';
import { getOrchidImage } from '../utils/imageMapper';
import ThemeToggle from './ThemeToggle';
import Navigation from './Navigation';
import './DetailPage.css';

const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orchid, setOrchid] = useState(null);

    useEffect(() => {
        const foundOrchid = ListOfOrchids.find(item => item.id === parseInt(id));
        if (foundOrchid) {
            setOrchid(foundOrchid);
        } else {
            navigate('/');
        }
    }, [id, navigate]);

    if (!orchid) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
            <Navigation />
            <div className="detail-page">
                <ThemeToggle />

                <div className="detail-container">
                    <button className="back-button" onClick={() => navigate('/')}>
                        ← Back to Gallery
                    </button>

                    <div className="detail-content">
                        <div className="detail-image-section">
                            <img
                                src={getOrchidImage(orchid)}
                                alt={orchid.name}
                                className="detail-image"
                            />
                            {orchid.isSpecial && (
                                <div className="detail-special-badge">⭐ Special Orchid</div>
                            )}
                        </div>

                        <div className="detail-info-section">
                            <h1 className="detail-title">{orchid.name}</h1>
                            <p className="detail-category">{orchid.category} Family</p>

                            <div className="detail-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Rating</span>
                                    <div className="stat-value">
                                        <span className="rating-number">{orchid.rating}</span>
                                        <span className="rating-stars">
                                            {'★'.repeat(Math.floor(orchid.rating))}
                                            {'☆'.repeat(5 - Math.floor(orchid.rating))}
                                        </span>
                                    </div>
                                </div>

                                <div className="stat-item">
                                    <span className="stat-label">Origin</span>
                                    <span className="stat-value">{orchid.origin}</span>
                                </div>

                                <div className="stat-item">
                                    <span className="stat-label">Colors</span>
                                    <span className="stat-value">{orchid.color}</span>
                                </div>

                                <div className="stat-item">
                                    <span className="stat-label">Type</span>
                                    <span className={`stat-value type-badge ${orchid.isNatural ? 'natural' : 'hybrid'}`}>
                                        {orchid.isNatural ? '🌿 Natural Species' : '🧪 Hybrid Variety'}
                                    </span>
                                </div>
                            </div>

                            <div className="detail-description">
                                <h2>About This Orchid</h2>
                                <p>
                                    The {orchid.name} is a {orchid.isNatural ? 'natural' : 'hybrid'} orchid species
                                    native to {orchid.origin}. This magnificent specimen is renowned for its
                                    {orchid.color.toLowerCase()} blooms and has earned an impressive rating of
                                    {orchid.rating} out of 5 stars from orchid enthusiasts worldwide.
                                </p>

                                {orchid.isSpecial && (
                                    <p className="special-note">
                                        <strong>Special Features:</strong> This orchid is considered particularly
                                        remarkable due to its rare characteristics, exceptional beauty, and unique
                                        growing patterns. It's highly sought after by collectors and makes an
                                        excellent centerpiece in any orchid collection.
                                    </p>
                                )}

                                <div className="care-tips">
                                    <h3>Care Information</h3>
                                    <ul>
                                        <li>Provide bright, indirect light</li>
                                        <li>Maintain humidity levels between 50-70%</li>
                                        <li>Water when potting medium becomes nearly dry</li>
                                        <li>Ensure good air circulation</li>
                                        <li>Feed with orchid fertilizer monthly</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailPage;