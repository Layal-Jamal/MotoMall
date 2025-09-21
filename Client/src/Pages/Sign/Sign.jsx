import { useState, useEffect } from 'react';
import axios from 'axios';
import './Sign.css';
import NavBar from "../../components/NavBar/NavBar";

export default function Sign() {
  const [formState, setFormState] = useState("signUp");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [forgotEmail, setForgotEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/';
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (formState === "signUp") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
      if (!formData.phone || formData.phone.trim().length < 10) {
        setError("Please enter a valid phone number");
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const API_BASE_URL = 'http://localhost:8000/api/v1';
      const url = formState === "signUp"
        ? `${API_BASE_URL}/auth/signup`
        : `${API_BASE_URL}/auth/login`;

      const requestBody = formState === "signUp"
        ? {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            passwordConfirm: formData.confirmPassword
          }
        : {
            email: formData.email,
            password: formData.password
          };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post(url, requestBody, config);

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.data) {
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        setSuccess(formState === "signUp"
          ? 'Account created successfully!'
          : 'Logged in successfully!');

        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setError('Authentication token not received');
      }

    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          if (err.response.data.errors) {
            const errorMessages = Object.values(err.response.data.errors)
              .map(error => error.message || error)
              .join(', ');
            setError(`Validation error: ${errorMessages}`);
          } else if (err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError('Invalid request. Please check your input data.');
          }
        } else {
          setError(err.response.data.message || `Error: ${err.response.status}`);
        }
      } else if (err.request) {
        setError('Cannot connect to server. Please make sure the backend is running on port 8000');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormToggle = () => {
    setFormState(prevState => prevState === "signUp" ? "signIn" : "signUp");
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post("http://localhost:8000/api/v1/auth/forgotPassword", {
        email: forgotEmail
      });
      setSuccess("Reset code sent to your email");
      setCurrentStep(2);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post("http://localhost:8000/api/v1/auth/verifyResetCode", {
        resetCode
      });
      setSuccess("Code verified");
      setCurrentStep(3);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.put("http://localhost:8000/api/v1/auth/resetPassword", {
        email: forgotEmail,
        newPassword
      });
      setSuccess("Password has been reset");
      setTimeout(() => {
        setFormState("signIn");
        setCurrentStep(1);
        setForgotEmail('');
        setResetCode('');
        setNewPassword('');
      }, 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Page-Sign">
      <NavBar />
      <div className={`container text-center ${formState}`}>
        <div className='header-title'>
          <h2>{formState === "signUp" ? "Sign Up" : "Sign In"}</h2>
        </div>

        {success && <div className="alert success">{success}</div>}
        {error && <div className="alert error">{error}</div>}

        {formState !== "forgot" ? (
          <form onSubmit={handleSubmit}>
            {formState === "signUp" && (
              <>
                <label className='label-field'>User Name</label>
                <input
                  className='name-input input-field'
                  type="text"
                  name="name"
                  placeholder='Enter User name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </>
            )}

            <label className='label-field'>Email</label>
            <input
              className='input-field'
              type='email'
              name="email"
              placeholder='Enter a valid email'
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={loading}
            />

            {formState === "signUp" && (
              <>
                <label className='label-field'>Phone Number</label>
                <input
                  className='phone-input input-field'
                  type='tel'
                  name="phone"
                  placeholder='Enter your phone number'
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </>
            )}

            <label className='label-field'>Password</label>
            <input
              className='password-field input-field'
              type='password'
              name="password"
              placeholder='Enter a strong password'
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={loading}
            />

            {formState === "signUp" && (
              <>
                <label className='label-field'>Confirm Password</label>
                <input
                  className='password-field input-field'
                  type='password'
                  name="confirmPassword"
                  placeholder='Confirm your password'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </>
            )}

            <button type='submit' className='sign-button' disabled={loading}>
              {loading ? 'Processing...' : (formState === "signUp" ? "Register" : "Sign In")}
            </button>
          </form>
        ) : (
          <>
            {currentStep === 1 && (
              <div className="forgot-step">
                <label className='label-field'>Email</label>
                <input
                  className='input-field'
                  type='email'
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
                />
                <button onClick={handleForgotPassword} className='sign-button' disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Code'}
                </button>
              </div>
            )}
            {currentStep === 2 && (
              <div className="forgot-step">
                <label className='label-field'>Reset Code</label>
                <input
                  className='input-field'
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="Enter code"
                  disabled={loading}
                />
                <button onClick={handleVerifyCode} className='sign-button' disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
              </div>
            )}
            {currentStep === 3 && (
              <div className="forgot-step">
                <label className='label-field'>New Password</label>
                <input
                  className='input-field'
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={loading}
                />
                <button onClick={handleResetPassword} className='sign-button' disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            )}
          </>
        )}

        <div className='link-sign'>
          {formState !== "forgot" ? (
            <>
              <a onClick={handleFormToggle} className='linkto-sign' href="#">
                {formState === "signUp"
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </a>
              <br />
              {formState === "signIn" && (
                <a onClick={() => setFormState("forgot")} className='linkto-sign' href="#">
                  Forgot Password?
                </a>
              )}
            </>
          ) : (
            <a onClick={() => setFormState("signIn")} className='linkto-sign' href="#">
              Back to Sign In
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
