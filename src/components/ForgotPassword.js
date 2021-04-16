import React , {useRef, useState} from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';


function ForgotPassword() {


    const emailRef = useRef();
    
    const { resetPassword } = useAuth();

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    // const history = useHistory();
    // console.log(emailRef);

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setMessage("")
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("password reset instruction sent to your email")
            // console.log( emailRef.current.value, passwordRef.current.value )
            // history.push('/');
        } catch{
            setError('failed to reset password')
        }
        setLoading(false);
    }

    return (
        <>

        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    {/* <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group> */}
                    
                    <Button disabled={loading} type="submit" className="w-100">
                        Reset Password
                    </Button>
                </Form>
                <div className="w-100 text-center mt-3" >
                    <Link to="/login">Login</Link>
                </div>
            </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
            Need an account ? <Link to="/signup">Sign Up</Link>
        </div>


        </>
    )
}

export default ForgotPassword;
