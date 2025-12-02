import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addOrchid, updateOrchid, fetchOrchids } from '../redux/orchidsSlice';
import { orchidImages, getOrchidImage } from '../utils/imageMapper';
import Navigation from './Navigation';
import './OrchidForm.css';

const orchidSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    origin: Yup.string()
        .min(3, 'Origin must be at least 3 characters')
        .required('Origin is required'),
    color: Yup.string()
        .required('Color is required'),
    category: Yup.string()
        .required('Category is required'),
    rating: Yup.number()
        .min(0, 'Rating must be between 0 and 5')
        .max(5, 'Rating must be between 0 and 5')
        .required('Rating is required'),
    image: Yup.string()
        .required('Image is required'),
});

function OrchidForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading } = useSelector((state) => state.orchids);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const isEditMode = !!id;
    const orchidToEdit = items.find(item => item.id === id);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchOrchids());
        }
    }, [dispatch, items.length]);

    const initialValues = isEditMode && orchidToEdit
        ? {
            name: orchidToEdit.name || '',
            origin: orchidToEdit.origin || '',
            color: orchidToEdit.color || '',
            category: orchidToEdit.category || '',
            rating: orchidToEdit.rating || 0,
            image: orchidToEdit.image || '',
            isSpecial: orchidToEdit.isSpecial || false,
            isNatural: orchidToEdit.isNatural || true,
        }
        : {
            name: '',
            origin: '',
            color: '',
            category: '',
            rating: 4.0,
            image: '',
            isSpecial: false,
            isNatural: true,
        };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (isEditMode) {
                await dispatch(updateOrchid({ id, orchidData: values }));
            } else {
                await dispatch(addOrchid(values));
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div>
                <Navigation />
                <div className="auth-warning">
                    <h2>🔒 Authentication Required</h2>
                    <p>Please login to {isEditMode ? 'edit' : 'add'} orchids</p>
                    <button onClick={() => navigate('/login')} className="login-redirect-btn">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="form-container">
            <Navigation />
            <div className="form-content">
                <h1>{isEditMode ? '✏️ Edit Orchid' : '➕ Add New Orchid'}</h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={orchidSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, values }) => (
                        <Form className="orchid-form">
                            <div className="form-group">
                                <label htmlFor="name">Orchid Name *</label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Enter orchid name"
                                    className="form-input"
                                />
                                <ErrorMessage name="name" component="div" className="error-message" />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="origin">Origin *</label>
                                    <Field
                                        type="text"
                                        name="origin"
                                        placeholder="e.g., Vietnam, Thailand"
                                        className="form-input"
                                    />
                                    <ErrorMessage name="origin" component="div" className="error-message" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="color">Color *</label>
                                    <Field
                                        type="text"
                                        name="color"
                                        placeholder="e.g., Pink, White"
                                        className="form-input"
                                    />
                                    <ErrorMessage name="color" component="div" className="error-message" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="category">Category *</label>
                                    <Field
                                        type="text"
                                        name="category"
                                        placeholder="e.g., Phalaenopsis"
                                        className="form-input"
                                    />
                                    <ErrorMessage name="category" component="div" className="error-message" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="rating">Rating (0-5) *</label>
                                    <Field
                                        type="number"
                                        name="rating"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        className="form-input"
                                    />
                                    <ErrorMessage name="rating" component="div" className="error-message" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Select Image *</label>
                                <Field as="select" name="image" className="form-input">
                                    <option value="">Choose an orchid image...</option>
                                    {Object.keys(orchidImages).map((key) => (
                                        <option key={key} value={key}>
                                            Orchid Image {key}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="image" component="div" className="error-message" />
                                {values.image && (
                                    <div className="image-preview">
                                        <img src={orchidImages[values.image]} alt="Preview" />
                                    </div>
                                )}
                            </div>

                            <div className="form-checkboxes">
                                <label className="checkbox-label">
                                    <Field type="checkbox" name="isSpecial" />
                                    <span>Special Orchid</span>
                                </label>

                                <label className="checkbox-label">
                                    <Field type="checkbox" name="isNatural" />
                                    <span>Natural Orchid</span>
                                </label>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    onClick={() => navigate('/dashboard')}
                                    className="cancel-btn"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="submit-btn"
                                >
                                    {isSubmitting ? 'Saving...' : isEditMode ? 'Update Orchid' : 'Add Orchid'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default OrchidForm;
