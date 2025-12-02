import { useState } from 'react';
import { Container, Row, Col, Tabs, Tab, Badge } from 'react-bootstrap';
import OrchidCard from './OrchidCard';
import Modal from './Modal';
import ThemeToggle from './ThemeToggle';
import Navigation from './Navigation';
import ListOfOrchids from '../data/ListOfOrchids';
import { useModal } from '../hooks/useModal';
import './Orchids.css';

const Orchids = () => {
    const [orchids] = useState(ListOfOrchids);
    const { isOpen, selectedItem, openModal, closeModal } = useModal();

    const naturalOrchids = orchids.filter(orchid => orchid.isNatural);
    const hybridOrchids = orchids.filter(orchid => !orchid.isNatural);
    const specialOrchids = orchids.filter(orchid => orchid.isSpecial);

    const renderOrchidGrid = (orchidList) => (
        <Row>
            {orchidList.map(orchid => (
                <Col key={orchid.id} xs={12} sm={6} lg={4} xl={3} className="mb-4">
                    <OrchidCard
                        orchid={orchid}
                        onDetailClick={openModal}
                    />
                </Col>
            ))}
        </Row>
    );

    return (
        <>
            <Navigation />
            <div className="orchids-container">
                <ThemeToggle />

                <Container fluid className="py-4">
                    <Row className="mb-4">
                        <Col>
                            <div className="text-center">
                                <h1 className="display-4 fw-bold text-success mb-3">
                                    🌺 Orchid Gallery
                                </h1>
                                <p className="lead text-muted">
                                    Discover the beauty of {orchids.length} magnificent orchid species
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <Tabs defaultActiveKey="all" id="orchid-tabs" className="mb-4">
                        <Tab
                            eventKey="all"
                            title={
                                <span>
                                    All Orchids <Badge bg="success" className="ms-1">{orchids.length}</Badge>
                                </span>
                            }
                        >
                            {renderOrchidGrid(orchids)}
                        </Tab>

                        <Tab
                            eventKey="natural"
                            title={
                                <span>
                                    Natural <Badge bg="success" className="ms-1">{naturalOrchids.length}</Badge>
                                </span>
                            }
                        >
                            {renderOrchidGrid(naturalOrchids)}
                        </Tab>

                        <Tab
                            eventKey="hybrid"
                            title={
                                <span>
                                    Hybrid <Badge bg="info" className="ms-1">{hybridOrchids.length}</Badge>
                                </span>
                            }
                        >
                            {renderOrchidGrid(hybridOrchids)}
                        </Tab>

                        <Tab
                            eventKey="special"
                            title={
                                <span>
                                    Special <Badge bg="warning" className="ms-1">{specialOrchids.length}</Badge>
                                </span>
                            }
                        >
                            {renderOrchidGrid(specialOrchids)}
                        </Tab>
                    </Tabs>
                </Container>

                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                    orchid={selectedItem}
                />
            </div>
        </>
    );
}; export default Orchids;