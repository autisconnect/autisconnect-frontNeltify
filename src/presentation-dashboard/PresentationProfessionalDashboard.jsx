import React, { useEffect } from 'react';
import { Container, Navbar, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaUserMd, FaChartLine, FaCalendarCheck, FaUsers, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logohori from '../assets/logohoriz copy.jpg';
import '../app.css';

function PresentationProfessionalDashboard() {
    const navigate = useNavigate();

    // --- Scroll to Top on Page Load ---
    useEffect(() => {
        window.scrollTo(0, 0); // Rola para o topo da página ao carregar
    }, []);

    // --- Handlers ---
    const handleBackToMain = () => {
        navigate('/'); // Redireciona para a página inicial (Home.jsx)
    };

    const handleSignUp = () => {
        navigate('/signup'); // Redireciona para a página de signup
    };

    const handleLogin = () => {
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div className="professional-dashboard-page">
            {/* Navbar */}
            <Navbar bg="light" variant="light" expand="lg" fixed="top" className="mb-4 service-navbar">
                <Container>
                    <Navbar.Brand>
                        <img
                            src={logohori}
                            alt="Autisconnect Logo"
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
            <div className="hero-section mb-5" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)`,
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
                marginTop: '70px'
            }}>
                <div>
                    <h1 className="display-4 fw-bold mb-3">Dashboard Profissional Autisconnect</h1>
                    <p className="lead mb-4 text-white">
                        Uma plataforma completa para profissionais de saúde especializados no atendimento de pessoas com TEA, 
                        oferecendo ferramentas avançadas de monitoramento e gestão de pacientes.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <Container fluid className="px-md-5">
                <Row className="mb-5">
                    <Col>
                        <h2 className="text-center mb-4">Recursos do Dashboard Profissional</h2>
                        <p className="text-center text-muted mb-5">
                            Nossa plataforma foi desenvolvida para auxiliar profissionais de saúde no acompanhamento 
                            e tratamento de pacientes com Transtorno do Espectro Autista (TEA), oferecendo ferramentas 
                            avançadas de monitoramento e análise.
                        </p>
                    </Col>
                </Row>

                {/* Funcionalidades */}
                <Row className="mb-5">
                    <Col md={6} className="mb-4">
                        <Card className="card h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaUsers className="text-primary me-3" size={30} />
                                    <h4>Gestão de Pacientes</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Gerencie todos os seus pacientes em um único lugar. Visualize informações detalhadas, 
                                    histórico de consultas, notas clínicas e progresso do tratamento. Organize pacientes 
                                    por status, diagnóstico ou próxima consulta para otimizar seu fluxo de trabalho.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Gestão de pacientes"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="card h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaCalendarCheck className="text-success me-3" size={30} />
                                    <h4>Agendamento de Consultas</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Simplifique o agendamento de consultas com nosso sistema intuitivo. Visualize sua agenda 
                                    diária, semanal ou mensal, receba notificações de novas consultas ou cancelamentos, e 
                                    gerencie seu tempo de forma eficiente para maximizar o atendimento aos pacientes.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Agendamento de consultas"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="card h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaChartLine className="text-warning me-3" size={30} />
                                    <h4>Monitoramento Avançado</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Acesse ferramentas avançadas de monitoramento para acompanhar o progresso de seus pacientes. 
                                    Visualize dados de gatilhos ambientais, risco de AVC, estereotipias e detecção de emoções 
                                    em gráficos interativos que facilitam a análise e tomada de decisões clínicas.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Monitoramento avançado"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className="card h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <FaClipboardList className="text-info me-3" size={30} />
                                    <h4>Relatórios e Documentação</h4>
                                </div>
                                <p className="feature-paragraph">
                                    Crie e gerencie relatórios clínicos, laudos e documentação de forma simples e eficiente. 
                                    Mantenha um registro completo do histórico de cada paciente, com acesso rápido a informações 
                                    importantes para o acompanhamento do tratamento e evolução clínica.
                                </p>
                                <Image
                                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    fluid
                                    rounded
                                    className="mt-3 feature-image"
                                    alt="Relatórios e documentação"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Seção de Monitoramento */}
                <Row className="mb-5">
                    <Col>
                        <h3 className="text-center mb-4">Ferramentas de Monitoramento Integradas</h3>
                        <Card className="shadow-sm p-4">
                            <Row>
                                <Col md={6} className="mb-4 mb-md-0">
                                    <h4 className="mb-3">Monitoramento Completo</h4>
                                    <p>
                                        Nossa plataforma oferece ferramentas avançadas para monitoramento de pacientes com TEA, 
                                        incluindo:
                                    </p>
                                    <ul className="feature-list">
                                        <li><strong>Detector de Gatilhos:</strong> Identifique e registre gatilhos ambientais que podem desencadear crises.</li>
                                        <li><strong>Monitor de Risco de AVC:</strong> Avalie assimetrias faciais e outros indicadores de risco.</li>
                                        <li><strong>Monitor de Estereotipias:</strong> Acompanhe padrões de movimentos repetitivos e sua frequência.</li>
                                        <li><strong>Detector de Emoções:</strong> Analise expressões faciais para identificar estados emocionais.</li>
                                    </ul>
                                    <p className="mt-3">
                                        Todos os dados são apresentados em gráficos interativos e relatórios detalhados, 
                                        facilitando a análise e o acompanhamento da evolução do paciente ao longo do tempo.
                                    </p>
                                </Col>
                                <Col md={6}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        fluid
                                        rounded
                                        className="feature-image-large"
                                        alt="Ferramentas de monitoramento"
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Depoimentos */}
                <Row className="mb-5">
                    <Col>
                        <h3 className="text-center mb-4">O que dizem os profissionais</h3>
                        <Row>
                            <Col md={4} className="mb-4">
                                <Card className="h-100 testimonial-card">
                                    <Card.Body>
                                        <p className="testimonial-text">
                                            "O dashboard profissional da Autisconnect revolucionou minha prática clínica. 
                                            As ferramentas de monitoramento me permitem acompanhar o progresso dos pacientes 
                                            de forma muito mais eficiente e precisa."
                                        </p>
                                        <div className="d-flex align-items-center mt-3">
                                            <div className="testimonial-avatar me-3">
                                                <FaUserMd size={24} />
                                            </div>
                                            <div>
                                                <h5 className="mb-0">Dra. Ana Souza</h5>
                                                <p className="text-muted mb-0">Neurologista Pediátrica</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="h-100 testimonial-card">
                                    <Card.Body>
                                        <p className="testimonial-text">
                                            "A gestão de pacientes e consultas ficou muito mais simples com a plataforma. 
                                            Consigo visualizar rapidamente todas as informações relevantes e organizar 
                                            meu fluxo de trabalho de forma mais eficiente."
                                        </p>
                                        <div className="d-flex align-items-center mt-3">
                                            <div className="testimonial-avatar me-3">
                                                <FaUserMd size={24} />
                                            </div>
                                            <div>
                                                <h5 className="mb-0">Dr. Carlos Mendes</h5>
                                                <p className="text-muted mb-0">Psiquiatra</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="h-100 testimonial-card">
                                    <Card.Body>
                                        <p className="testimonial-text">
                                            "As ferramentas de monitoramento, especialmente o detector de emoções e o monitor 
                                            de estereotipias, trouxeram insights valiosos para minha prática terapêutica. 
                                            Recomendo a todos os profissionais da área."
                                        </p>
                                        <div className="d-flex align-items-center mt-3">
                                            <div className="testimonial-avatar me-3">
                                                <FaUserMd size={24} />
                                            </div>
                                            <div>
                                                <h5 className="mb-0">Dra. Patrícia Lima</h5>
                                                <p className="text-muted mb-0">Terapeuta Ocupacional</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* Chamada para Ação */}
                <Row className="mb-5 text-center">
                    <Col>
                        <Card className="cta-card p-5">
                            <h3>Comece a usar o Dashboard Profissional hoje mesmo</h3>
                            <p className="text-muted mb-4">
                                Junte-se a centenas de profissionais que já estão utilizando nossa plataforma para 
                                melhorar o atendimento e acompanhamento de pacientes com TEA.
                            </p>
                            <div>
                                <Button variant="primary" size="lg" onClick={handleSignUp}>
                                    Comece Agora
                                </Button>
                            </div>
                        </Card>
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

            {/* CSS Adicional */}
            <style jsx>{`
                .professional-dashboard-page {
                    padding-top: 0;
                }
                .hero-section {
                    margin-top: 70px;
                }
                .feature-paragraph {
                    min-height: 120px;
                }
                .feature-image {
                    height: 200px;
                    object-fit: cover;
                    width: 100%;
                }
                .feature-image-large {
                    height: 100%;
                    object-fit: cover;
                    width: 100%;
                    max-height: 400px;
                }
                .feature-list li {
                    margin-bottom: 10px;
                }
                .testimonial-card {
                    border-left: 4px solid #007bff;
                }
                .testimonial-text {
                    font-style: italic;
                    position: relative;
                }
                .testimonial-text::before {
                    content: '"';
                    font-size: 60px;
                    color: #f0f0f0;
                    position: absolute;
                    top: -20px;
                    left: -15px;
                    z-index: 0;
                }
                .testimonial-avatar {
                    background-color: #e9ecef;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .cta-card {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    border: none;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

export default PresentationProfessionalDashboard;

