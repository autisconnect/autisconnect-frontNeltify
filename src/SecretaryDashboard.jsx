import React, { useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Nav, Tab, Badge, Modal, Spinner, Alert } from 'react-bootstrap';
import { Calendar2Check, ChatDots, Bell, PlusCircle, BarChartLine, PieChart, ArrowLeft } from 'react-bootstrap-icons'; // Importar ArrowLeft
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import io from 'socket.io-client';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import logohori from './assets/logo.png';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const socket = io('http://localhost:5000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
} );

const DashboardCard = ({ title, children, isLoading }) => (
  <Card className="h-100 shadow-sm">
    {/* O cabeçalho do card será estilizado pelo CSS global */}
    <Card.Header>
      <h5 className="mb-0">{title}</h5>
    </Card.Header>
    <Card.Body>
      {isLoading ? <div className="text-center"><Spinner animation="border" size="sm" /></div> : children}
    </Card.Body>
  </Card>
);

const SecretaryDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id: secretaryId } = useParams();

  // --- ESTADOS ---
  const [authValidated, setAuthValidated] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [professional, setProfessional] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ recipientId: '', content: '' });
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: '', appointment_date: '', appointment_time: '', appointment_type: 'Consulta Regular',
    status: 'Agendada', payment_method: 'Pix', payment_details: '', payment_status: 'Pendente',
    value: '', notes: '',
  });
  const [filters, setFilters] = useState({ date: '', patientId: '', status: '' });

  // ... (O resto das suas funções de API, handlers e useEffects permanecem os mesmos)
  // --- FUNÇÕES DE API ---
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json',
  });

  const fetchWithToken = useCallback(async (url, setData, errorMsg) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token ausente.');
      const response = await fetch(url, { headers: getAuthHeaders() });
      if (response.status === 401) throw new Error('Sessão expirada.');
      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: `Falha na requisição para ${url}` }));
        throw new Error(errData.error || errorMsg);
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error(`Error fetching ${url}:`, err.message);
      setError(err.message);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    setLoadingData(true);
    setError('');
    await Promise.all([
      fetchWithToken(`http://localhost:5000/api/secretary/patients`, setPatients, 'Erro ao buscar pacientes'  ),
      fetchWithToken(`http://localhost:5000/api/secretary/professionals`, (data  ) => setProfessional(data[0] || null), 'Erro ao buscar profissional'),
      fetchWithToken(`http://localhost:5000/api/secretary/appointments`, setAppointments, 'Erro ao buscar consultas'  ),
      fetchWithToken(`http://localhost:5000/api/secretary/messages`, setMessages, 'Erro ao buscar mensagens'  ),
    ]);
    setLoadingData(false);
  }, [fetchWithToken]);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user.tipo_usuario !== 'secretaria' || (secretaryId && parseInt(secretaryId, 10) !== user.id)) {
      logout(); navigate('/login'); return;
    }
    setAuthValidated(true);
  }, [user, secretaryId, navigate, logout]);

  useEffect(() => {
    if (authValidated) { fetchAllData(); }
  }, [authValidated, fetchAllData]);

  // --- HANDLERS ---
  const handleFieldUpdate = async (appointmentId, field, value) => {
    setAppointments((prev) => prev.map((c) => (c.id === appointmentId ? { ...c, [field]: value } : c)));
    try {
      const response = await fetch(`http://localhost:5000/api/secretary/appointments/${appointmentId}`, {
        method: 'PUT', headers: getAuthHeaders(  ), body: JSON.stringify({ field, value }),
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Falha ao atualizar.');
      setSuccessMessage('Agendamento atualizado!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError(err.message);
      fetchAllData();
    }
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    if (!professional?.id) { setError('Profissional não identificado.'); return; }
    if (!newAppointment.patientId || !newAppointment.appointment_date || !newAppointment.appointment_time || !newAppointment.value) {
      setError('Paciente, data, hora e valor são obrigatórios.'); return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/secretary/appointments`, {
        method: 'POST', headers: getAuthHeaders(  ), body: JSON.stringify({ ...newAppointment, professional_id: professional.id }),
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Falha ao registrar consulta.');
      setShowAppointmentModal(false);
      setNewAppointment({
        patientId: '', appointment_date: '', appointment_time: '', appointment_type: 'Consulta Regular',
        status: 'Agendada', payment_method: 'Pix', payment_details: '', payment_status: 'Pendente', value: '', notes: '',
      });
      setSuccessMessage('Consulta registrada com sucesso!');
      await fetchAllData();
      socket.emit('newAppointment', { professionalId: professional.id });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) { setError(err.message); }
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.recipientId || !newMessage.content) {
      setError('Destinatário e conteúdo da mensagem são obrigatórios.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/secretary/messages`, {
        method: 'POST',
        headers: getAuthHeaders(  ),
        body: JSON.stringify(newMessage),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Falha ao enviar mensagem.');
      }
      setNewMessage({ recipientId: '', content: '' });
      setShowCommunicationModal(false);
      setSuccessMessage('Mensagem enviada com sucesso!');
      await fetchWithToken(`http://localhost:5000/api/secretary/messages`, setMessages, 'Erro ao buscar mensagens'  );
      socket.emit('newMessage', { ...newMessage, senderId: user.id });
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'N/A';
  const formatTime = (timeString) => timeString ? timeString.substring(0, 5) : 'N/A';

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredAppointments = useMemo(() => {
    if (!Array.isArray(appointments)) return [];
    return appointments.filter(app => {
      const appointmentDate = app.appointment_date ? app.appointment_date.split('T')[0] : '';
      const matchesDate = !filters.date || appointmentDate === filters.date;
      const matchesPatient = !filters.patientId || app.patient_id.toString() === filters.patientId;
      const matchesStatus = !filters.status || app.status === filters.status;
      return matchesDate && matchesPatient && matchesStatus;
    });
  }, [appointments, filters]);

  const { appointmentsToday, upcomingAppointments, pendingPayments } = useMemo(() => {
    if (!Array.isArray(appointments)) return { appointmentsToday: [], upcomingAppointments: [], pendingPayments: [] };
    const today = new Date().toISOString().slice(0, 10);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const todayList = appointments.filter(a => a.appointment_date?.slice(0, 10) === today);
    const upcomingList = appointments.filter(a => {
        const appDate = new Date(a.appointment_date);
        return appDate > new Date() && appDate <= nextWeek;
    }).sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));
    const pendingList = appointments.filter(a => a.payment_status === 'Pendente' && a.status === 'Realizada');

    return { appointmentsToday: todayList, upcomingAppointments: upcomingList, pendingPayments: pendingList };
  }, [appointments]);

  const chartData = useMemo(() => {
    if (!Array.isArray(appointments)) return { statusDistribution: { labels: [], datasets: [] }, dailyPerformance: { labels: [], datasets: [] } };
    
    const statusCounts = appointments.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    const dailyCounts = appointments.reduce((acc, app) => {
        if (app.status === 'Realizada') {
            const date = formatDate(app.appointment_date);
            acc[date] = (acc[date] || 0) + 1;
        }
        return acc;
    }, {});

    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }).reverse();

    return {
      statusDistribution: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6c757d'],
          hoverOffset: 4,
        }],
      },
      dailyPerformance: {
        labels: last7Days,
        datasets: [{
          label: 'Consultas Realizadas',
          data: last7Days.map(day => dailyCounts[day] || 0),
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1,
        }],
      },
    };
  }, [appointments]);

  if (!authValidated) return <Container className="text-center mt-5"><Spinner animation="border" /><p>Validando...</p></Container>;

  return (
    // >>>>> CLASSE ADICIONADA AQUI <<<<<
    <Container fluid className="py-4 secretary-dashboard">
      {/* ================================================================== */}
      {/* >>>>> CABEÇALHO ANTIGO SUBSTITUÍDO POR ESTA ROW <<<<< */}
      {/* ================================================================== */}
      <Row className="professional-header-row mb-4 align-items-center">
          <Col xs="auto">
              <img src={logohori} alt="AutisConnect Logo" className="details-logo" />
          </Col>
          <Col>
              <h1 className="professional-name mb-0">Dashboard da Secretária</h1>
              <p className="professional-specialty text-muted mb-0">Organizando a clínica de {professional?.name || '...'}</p>
          </Col>
          <Col xs="auto">
              <Button variant="danger" onClick={() => { logout(); navigate('/'); }}>Sair</Button>
          </Col>
      </Row>

      <Container fluid>
        {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>{successMessage}</Alert>}
        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
                <Card.Body>
                    <Row className="align-items-center">
                        <Col md={3} className>
                            <Button variant="primary" onClick={() => setShowAppointmentModal(true)}><PlusCircle className="me-2" /> Nova Consulta</Button>
                        </Col>
                    </Row>
                </Card.Body>
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="tabs" className="mb-4">
            <Nav.Item><Nav.Link eventKey="overview"><Calendar2Check className="me-2" />Visão Geral</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="analytics"><BarChartLine className="me-2" />Análises</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="full_history"><Calendar2Check className="me-2" />Histórico Completo</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="communication"><ChatDots className="me-2" />Comunicação</Nav.Link></Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="overview">
              <Row>
                <Col lg={8}>
                  <DashboardCard title="Consultas de Hoje" isLoading={loadingData}>
                    <Table striped hover responsive size="sm">
                      <thead><tr><th>Horário</th><th>Paciente</th><th>Tipo</th><th>Status</th></tr></thead>
                      <tbody>
                        {appointmentsToday.length > 0 ? appointmentsToday.map(app => (
                          <tr key={app.id}>
                            <td>{formatTime(app.appointment_time)}</td>
                            <td>{app.patient_name}</td>
                            <td>{app.appointment_type}</td>
                            <td><Badge bg={app.status === 'Realizada' ? 'success' : 'info'}>{app.status}</Badge></td>
                          </tr>
                        )) : <tr><td colSpan="4" className="text-center text-muted">Nenhuma consulta para hoje.</td></tr>}
                      </tbody>
                    </Table>
                  </DashboardCard>
                  <div className="mt-4">
                    <DashboardCard title="Próximos Agendamentos (7 dias)" isLoading={loadingData}>
                      <Table striped hover responsive size="sm">
                        <thead><tr><th>Data</th><th>Horário</th><th>Paciente</th><th>Status</th></tr></thead>
                        <tbody>
                          {upcomingAppointments.length > 0 ? upcomingAppointments.map(app => (
                            <tr key={app.id}>
                              <td>{formatDate(app.appointment_date)}</td>
                              <td>{formatTime(app.appointment_time)}</td>
                              <td>{app.patient_name}</td>
                              <td><Badge bg="secondary">{app.status}</Badge></td>
                            </tr>
                          )) : <tr><td colSpan="4" className="text-center text-muted">Nenhum agendamento próximo.</td></tr>}
                        </tbody>
                      </Table>
                    </DashboardCard>
                  </div>
                </Col>
                <Col lg={4}>
                  <DashboardCard title="Pagamentos Pendentes" isLoading={loadingData}>
                    <Table striped hover responsive size="sm">
                      <thead><tr><th>Paciente</th><th>Valor</th></tr></thead>
                      <tbody>
                        {pendingPayments.length > 0 ? pendingPayments.map(app => (
                          <tr key={app.id}>
                            <td>{app.patient_name}</td>
                            <td>R$ {parseFloat(app.value).toFixed(2)}</td>
                          </tr>
                        )) : <tr><td colSpan="2" className="text-center text-muted">Nenhum pagamento pendente.</td></tr>}
                      </tbody>
                    </Table>
                  </DashboardCard>
                </Col>
              </Row>
            </Tab.Pane>

            {/* O resto das suas abas e modais permanecem os mesmos */}
            <Tab.Pane eventKey="analytics">
              <Row>
                <Col lg={8} className="mb-4">
                  <DashboardCard title="Atendimentos por Dia (Últimos 7 dias)" isLoading={loadingData}>
                    <Bar data={chartData.dailyPerformance} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                  </DashboardCard>
                </Col>
                <Col lg={4} className="mb-4">
                  <DashboardCard title="Status das Consultas" isLoading={loadingData}>
                    <Doughnut data={chartData.statusDistribution} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                  </DashboardCard>
                </Col>
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="full_history">
              <Card>
                <Card.Header>
                  <Row className="align-items-center">
                    <Col>
                      <h5>Histórico Geral de Consultas</h5>
                    </Col>
                  </Row>
                </Card.Header>
                    {/*<Row className="align-items-center">
                      <p></p>
                        <Col md={3} className="ms-auto text-end">
                            <Button variant="primary" onClick={() => setShowAppointmentModal(true)}><PlusCircle className="me-2" /> Nova Consulta</Button>
                        </Col>
                    </Row>*/}
                <Card.Body>
                  <Row className="mb-3">
                    <Col md={4}><Form.Group><Form.Label>Filtrar por Data</Form.Label><Form.Control type="date" name="date" value={filters.date} onChange={handleFilterChange} /></Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Filtrar por Paciente</Form.Label><Form.Select name="patientId" value={filters.patientId} onChange={handleFilterChange}><option value="">Todos</option>{Array.isArray(patients) && patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</Form.Select></Form.Group></Col>
                    <Col md={4}><Form.Group><Form.Label>Filtrar por Status</Form.Label><Form.Select name="status" value={filters.status} onChange={handleFilterChange}><option value="">Todos</option><option value="Agendada">Agendada</option><option value="Confirmada">Confirmada</option><option value="Realizada">Realizada</option><option value="Cancelada">Cancelada</option><option value="Não Realizada">Não Realizada</option></Form.Select></Form.Group></Col>
                  </Row>
                  <Table striped bordered hover responsive>
                    <thead><tr><th>Data/Hora</th><th>Paciente</th><th>Valor (R$)</th><th>Status</th><th>Forma Pag.</th><th>Detalhes</th><th>Status Pag.</th></tr></thead>
                    <tbody>
                      {filteredAppointments.length > 0 ? filteredAppointments.map((app) => (
                        <tr key={app.id}>
                          <td>{`${formatDate(app.appointment_date)} ${formatTime(app.appointment_time)}`}</td>
                          <td>{app.patient_name || 'N/A'}</td>
                          <td>{app.value ? parseFloat(app.value).toFixed(2) : '0.00'}</td>
                          <td><Form.Select size="sm" value={app.status} onChange={(e) => handleFieldUpdate(app.id, 'status', e.target.value)}><option value="Agendada">Agendada</option><option value="Confirmada">Confirmada</option><option value="Realizada">Realizada</option><option value="Cancelada">Cancelada</option><option value="Não Realizada">Não Realizada</option></Form.Select></td>
                          <td><Form.Select size="sm" value={app.payment_method || ''} onChange={(e) => handleFieldUpdate(app.id, 'payment_method', e.target.value)}><option value="">N/A</option><option value="Pix">Pix</option><option value="Crédito">Crédito</option><option value="Débito">Débito</option><option value="Dinheiro">Dinheiro</option><option value="Plano de Saúde">Plano de Saúde</option><option value="Outros">Outros</option></Form.Select></td>
                          <td>{(app.payment_method === 'Plano de Saúde' || app.payment_method === 'Outros') && (<Form.Control type="text" size="sm" defaultValue={app.payment_details || ''} onBlur={(e) => handleFieldUpdate(app.id, 'payment_details', e.target.value)} />)}</td>
                          <td><Form.Select size="sm" value={app.payment_status} onChange={(e) => handleFieldUpdate(app.id, 'payment_status', e.target.value)}><option value="Pendente">Pendente</option><option value="Pago">Pago</option><option value="Atrasado">Atrasado</option><option value="Isento">Isento</option></Form.Select></td>
                        </tr>
                      )) : <tr><td colSpan="7" className="text-center">Nenhuma consulta encontrada.</td></tr>}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab.Pane>
            
            <Tab.Pane eventKey="communication">
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5>Comunicação com Profissional</h5>
                </Card.Header>
                <Row className="align-items-center">
                  <p></p>
                    <Col md={3} className="ms-auto text-end">
                      <Button variant="primary" size="sm" onClick={() => setShowCommunicationModal(true)}>Enviar Mensagem</Button>
                    </Col>
                </Row>
                <Card.Body>
                  {loadingData ? <Spinner animation="border" size="sm" /> :
                    Array.isArray(messages) && messages.length > 0 ? messages.map((message) => (
                      <div key={message.id} className="d-flex align-items-start mb-3">
                        <Bell className={`me-2 mt-1 ${message.read ? 'text-muted' : 'text-primary'}`} />
                        <div>
                          <p className={message.read ? 'text-muted' : ''}><strong>{message.sender_name || 'N/A'}:</strong> {message.content}</p>
                          <small className="text-muted">{formatDate(message.created_at)}</small>
                        </div>
                      </div>
                    )) : <p className="text-muted">Nenhuma mensagem encontrada.</p>
                  }
                </Card.Body>
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        {/* Modais permanecem os mesmos */}


        <Modal show={showAppointmentModal} onHide={() => setShowAppointmentModal(false)} size="lg">
          <Modal.Header closeButton><Modal.Title>Registrar Nova Consulta</Modal.Title></Modal.Header>
          <Form onSubmit={handleAddAppointment}>
            <Modal.Body>
              <Row>
                <Col md={12}><Form.Group className="mb-3"><Form.Label>Paciente *</Form.Label><Form.Select name="patientId" value={newAppointment.patientId} onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })} required><option value="">Selecione um paciente</option>{Array.isArray(patients) && patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</Form.Select></Form.Group></Col>
              </Row>
              <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Data da Consulta *</Form.Label><Form.Control type="date" name="appointment_date" value={newAppointment.appointment_date} onChange={(e) => setNewAppointment({ ...newAppointment, appointment_date: e.target.value })} required /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Hora da Consulta *</Form.Label><Form.Control type="time" name="appointment_time" value={newAppointment.appointment_time} onChange={(e) => setNewAppointment({ ...newAppointment, appointment_time: e.target.value })} required /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Tipo de Consulta</Form.Label><Form.Select name="appointment_type" value={newAppointment.appointment_type} onChange={(e) => setNewAppointment({ ...newAppointment, appointment_type: e.target.value })}><option value="Consulta Regular">Consulta Regular</option><option value="Consulta Inicial">Consulta Inicial</option><option value="Acompanhamento">Acompanhamento</option><option value="Avaliação">Avaliação</option><option value="Terapia">Terapia</option></Form.Select></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Status da Consulta</Form.Label><Form.Select name="status" value={newAppointment.status} onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}><option value="Agendada">Agendada</option><option value="Confirmada">Confirmada</option><option value="Realizada">Realizada</option><option value="Cancelada">Cancelada</option><option value="Não Realizada">Não Realizada</option></Form.Select></Form.Group></Col>
              </Row>
              <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Valor da Consulta (R$) *</Form.Label><Form.Control type="number" step="0.01" name="value" placeholder="Ex: 150.00" value={newAppointment.value} onChange={(e) => setNewAppointment({ ...newAppointment, value: e.target.value })} required /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Status do Pagamento</Form.Label><Form.Select name="payment_status" value={newAppointment.payment_status} onChange={(e) => setNewAppointment({ ...newAppointment, payment_status: e.target.value })}><option value="Pendente">Pendente</option><option value="Pago">Pago</option><option value="Atrasado">Atrasado</option><option value="Isento">Isento</option></Form.Select></Form.Group></Col>
              </Row>
              <hr />
              <h5>Detalhes do Pagamento</h5>
              <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Forma de Pagamento</Form.Label><Form.Select name="payment_method" value={newAppointment.payment_method} onChange={(e) => setNewAppointment({ ...newAppointment, payment_method: e.target.value })}><option value="Pix">Pix</option><option value="Crédito">Cartão de Crédito</option><option value="Débito">Cartão de Débito</option><option value="Dinheiro">Dinheiro</option><option value="Plano de Saúde">Plano de Saúde</option><option value="Outros">Outros</option></Form.Select></Form.Group></Col>
                {(newAppointment.payment_method === 'Plano de Saúde' || newAppointment.payment_method === 'Outros') && <Col md={6}><Form.Group className="mb-3"><Form.Label>Especifique</Form.Label><Form.Control type="text" name="payment_details" placeholder="Ex: Unimed ou Transferência" value={newAppointment.payment_details} onChange={(e) => setNewAppointment({ ...newAppointment, payment_details: e.target.value })} /></Form.Group></Col>}
              </Row>
              <Form.Group className="mb-3"><Form.Label>Observações</Form.Label><Form.Control as="textarea" rows={3} name="notes" value={newAppointment.notes} onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })} /></Form.Group>
            </Modal.Body>
            <Modal.Footer><Button variant="secondary" onClick={() => setShowAppointmentModal(false)}>Cancelar</Button><Button variant="primary" type="submit">Salvar Consulta</Button></Modal.Footer>
          </Form>
        </Modal>

        <Modal show={showCommunicationModal} onHide={() => setShowCommunicationModal(false)}>
          <Modal.Header closeButton><Modal.Title>Enviar Mensagem</Modal.Title></Modal.Header>
          <Form onSubmit={handleSendMessage}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Destinatário *</Form.Label>
                <Form.Select value={newMessage.recipientId} onChange={(e) => setNewMessage({ ...newMessage, recipientId: e.target.value })} required>
                  <option value="">Selecione um destinatário</option>
                  {professional && <option value={professional.id}>{professional.name}</option>}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mensagem *</Form.Label>
                <Form.Control as="textarea" rows={5} value={newMessage.content} onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })} required />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowCommunicationModal(false)}>Cancelar</Button>
              <Button variant="primary" type="submit">Enviar</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </Container>
  );
};

export default SecretaryDashboard;
