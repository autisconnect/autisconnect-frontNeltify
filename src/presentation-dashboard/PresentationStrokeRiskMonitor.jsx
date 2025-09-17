// src/presentation-dashboard/PresentationStrokeRiskMonitor.jsx
import React, { useEffect } from 'react';
import { Container, Navbar, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaCamera, FaChartLine, FaChartBar, FaBell, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logohori from '../assets/logohoriz.jpg';
import '../App.css';

function PresentationStrokeRiskMonitor() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBackToMain = () => {
        navigate('/');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="stroke-risk-page">
            <Navbar bg="light" variant="light" expand="lg" fixed="top" className="mb-4 service-navbar">
                <Container>
                    <Navbar.Brand>
                        <img
                            src={logohori}
                            alt="AutisConnect Logo"
                            className="d-inline-block align-top logo"
                        />
                    </Navbar.Brand>
                    <div className="ms-auto">
                        <Button variant="danger" onClick={handleBackToMain}
                        style={{ backgroundColor: '#007bff', borderColor: '#007bff', boxShadow: '0 6px 8px rgba(107, 97, 97, 0.1)' }}>
                            Voltar
                        </Button>
                    </div>
                </Container>
            </Navbar>

            <div
                className="hero-section mb-5"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://medicinasa.com.br/wp-content/uploads/2024/07/inteligencia-artificial-digital-inovacao-identificacao-biometria-rosto-2.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#343a40', // Fallback para cinza escuro
                    minHeight: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    padding: '20px',
                    borderRadius: '10px',
                }}
            >
                <div>
                    <h1 className="display-4 fw-bold mb-3">Avaliação de Risco de AVC AutisConnect</h1>
                    <p className="lead mb-4" style={{ color: 'white' }}>
                        Monitore sinais de alerta para AVC com análise de assimetria facial em tempo real, usando inteligência artificial.
                    </p>
                </div>
            </div>

            <Container fluid className="px-md-5">
                <Row className="mb-5">
                    <Col>
                        <h2 className="text-center mb-4">Como a Avaliação de Risco de AVC Funciona</h2>
                        <p className="text-center text-muted mb-5">
                            Nossa ferramenta utiliza reconhecimento facial para detectar assimetrias faciais, um potencial sinal de alerta para AVC, fornecendo relatórios detalhados e alertas em tempo real.
                        </p>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaCamera className="text-primary me-3" size={30} />
                                    <h4>Detecção em Tempo Real</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Analise assimetrias faciais ao vivo para identificar sinais de alerta de AVC instantaneamente.
                                </p>
                                <Image
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QilJ6_6Mivvt7PpPI8fSfQjOAWe_oGMSFA&s"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Detecção em tempo real"
                                    style={{ backgroundColor: '#e9ecef' }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaChartLine className="text-success me-3" size={30} />
                                    <h4>Gráficos de Tendências</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Visualize a evolução da assimetria facial ao longo do tempo com gráficos interativos, filtrados por dia, semana ou mês.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Gráficos de tendências"
                                    style={{ backgroundColor: '#e9ecef' }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaChartBar className="text-warning me-3" size={30} />
                                    <h4>Distribuição de Riscos</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Veja a frequência de níveis de risco (Baixo, Médio, Alto) em gráficos de barras para monitorar padrões.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Distribuição de riscos"
                                    style={{ backgroundColor: '#e9ecef' }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaBell className="text-danger me-3" size={30} />
                                    <h4>Alertas de Risco</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Receba notificações imediatas quando níveis altos ou médios de assimetria forem detectados, com orientações para ação.
                                </p>
                                <Image
                                    src="data:image/jpeg;base64,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"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Alertas de risco"
                                    style={{ backgroundColor: '#e9ecef' }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaInfoCircle className="text-info me-3" size={30} />
                                    <h4>Informações Educativas</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Acesse informações sobre sinais de AVC e a importância da detecção precoce para uma resposta rápida.
                                </p>
                                <Image
                                    src="data:image/jpeg;base64,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"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Informações educativas"
                                    style={{ backgroundColor: '#e9ecef' }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-5 text-center">
                    <Col>
                        <h3>Experimente a Avaliação de Risco de AVC</h3>
                        <p className="text-muted mb-4">
                            Comece a monitorar sua saúde com nossa ferramenta avançada de detecção de assimetria facial. Cadastre-se agora!
                        </p>
                        <Button variant="primary" size="lg" onClick={handleSignUp}>
                            Comece Agora
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
                <footer className="bg-light py-4 mt-5">
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <p className="mb-0 text-muted">© 2025 Autisconnect. Todos os direitos reservados.</p>
                            </Col>
                        </Row>
                    </Container>
                </footer>
        </div>
    );
}

export default PresentationStrokeRiskMonitor;