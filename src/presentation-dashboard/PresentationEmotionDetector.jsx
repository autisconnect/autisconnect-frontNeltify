// src/PresentationEmotionDetector.jsx
import React, { useEffect } from 'react';
import { Container, Navbar, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaCamera, FaChartLine, FaChartBar, FaBrain, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logohori from '../assets/logohoriz.jpg';
import '../App.css';

function PresentationEmotionDetector() {
    const navigate = useNavigate();

    // Scroll to top na carga da página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBackToMain = () => {
        navigate('/'); // Redireciona para Home.jsx
    };

    const handleSignUp = () => {
        navigate('/signup'); // Redireciona para signup
    };

    return (
        <div className="emotion-detector-page">
            {/* Navbar */}
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

            {/* Hero Section */}
            <div
                className="hero-section mb-5"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    padding: '30px',
                    borderRadius: '10px',
                }}
            >
                <div>
                    <h1 className="display-4 fw-bold mb-3">Detector de Emoções AutisConnect</h1>
                    <p className="lead mb-4 text-white">
                        Identifique emoções em tempo real usando inteligência artificial para apoiar cuidadores, pais e profissionais.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <Container fluid className="px-md-5">
                <Row className="mb-5">
                    <Col>
                        <h2 className="text-center mb-4">Como o Detector de Emoções Funciona</h2>
                        <p className="text-center text-muted mb-5">
                            Nossa ferramenta utiliza reconhecimento facial para detectar sete emoções básicas, fornecendo insights valiosos para o acompanhamento emocional.
                        </p>
                    </Col>
                </Row>

                {/* Funcionalidades */}
                <Row className="mb-5">
                    <Col md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaCamera className="text-primary me-3" size={30} />
                                    <h4>Detecção em Tempo Real</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Analise expressões faciais ao vivo para identificar emoções como felicidade, tristeza ou surpresa instantaneamente.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Detecção em tempo real"
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
                                    Visualize a evolução das emoções ao longo do tempo com gráficos interativos, filtrados por dia, semana ou mês.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Gráficos de tendências"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaChartBar className="text-warning me-3" size={30} />
                                    <h4>Distribuição de Emoções</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Veja a frequência de cada emoção detectada em um gráfico de barras para entender padrões emocionais.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Distribuição de emoções"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaBrain className="text-info me-3" size={30} />
                                    <h4>Comparação entre Sessões</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Compare o desempenho emocional entre diferentes sessões para avaliar progresso e engajamento.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Comparação entre sessões"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaLightbulb className="text-primary me-3" size={30} />
                                    <h4>Insights e Recomendações</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Receba sugestões personalizadas baseadas nas emoções detectadas, como atividades para melhorar o humor.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Insights e recomendações"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Chamada para Ação */}
                <Row className="mb-5 text-center">
                    <Col>
                        <h3>Experimente o Detector de Emoções</h3>
                        <p className="text-muted mb-4">
                            Comece a utilizar nossa ferramenta para acompanhar estados emocionais de forma prática e eficaz. Cadastre-se agora!
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

export default PresentationEmotionDetector;