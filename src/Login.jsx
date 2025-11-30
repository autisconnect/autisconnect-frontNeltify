// src/pages/Login.jsx (VERSÃO FINAL E CONSISTENTE)

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, Navbar, Form, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import logohori from './assets/logohoriz.jpg';
import { AuthContext } from './context/AuthContext.jsx';
import './App.css';

function Login() {
    const [email, setEmail] = useState(''); // Usando 'email' como nome do estado
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleBackToHome = () => navigate('/');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // CORREÇÃO: Usando a variável 'email' no log
            console.log(`Tentando login para usuário: ${email}`);
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            
            // Enviando 'username' para a API, com o valor do estado 'email'
            const response = await axios.post(`${API_URL}/api/login`, {
                username: email, 
                password: password
            } );

            console.log('Resposta do servidor:', response.data);
            
            const { token, user } = response.data;

            if (!token || !user) {
                throw new Error('Resposta de login inválida do servidor.');
            }

            // A função 'login' do AuthContext cuidará de tudo
            login(token, user);

        } catch (err) {
            console.error('Erro ao fazer login:', err);
            setError(err.response?.data?.error || 'Erro de conexão. Verifique sua rede.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <Navbar bg="light" expand="lg" fixed="top" className="mb-4">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logohori} alt="Logo" className="logo" />
                    </Navbar.Brand>
                    <div className="ms-auto">
                        <ArrowLeft size={30} onClick={handleBackToHome} style={{ cursor: 'pointer' }} />
                    </div>
                </Container>
            </Navbar>

            <section className="login-section py-5" style={{ marginTop: '70px' }}>
                <Container>
                    <h2 className="display-3 fw-bold mb-4 text-white">Bem-vindo de volta!</h2>
                    <p className="text-center lead mb-5">
                        Faça login para acessar sua conta e conectar-se à família AutisConnect.
                    </p>

                    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Login</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Digite seu email"
                                        value={email} // CORREÇÃO: Usando o estado 'email'
                                        onChange={(e) => setEmail(e.target.value)} // CORREÇÃO: Usando 'setEmail'
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Entrar'}
                                </Button>
                                <div className="text-center">
                                    <a href="/signup">Não tem uma conta? Cadastre-se</a>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </div>
    );
}

export default Login;
