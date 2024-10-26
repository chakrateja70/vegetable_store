import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import './index.css';

function SignUpPage() {
  const [signupData, setSignupData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/signUpDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate('/signin');
      } else {
        setError(data.message || 'Sign up failed');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignUp-container">
      {loading && (
        <div className="loading-overlay">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      )}
      <form className={`SignUp-form ${loading ? 'blur-content' : ''}`} onSubmit={handleSubmit}>
        <div className='label-section'>
          <h1 className='heading'>Sign up</h1>
        </div>

        <div className='label-section'>
          <label>
            Name<span className="mandatory">*<div className="popup">This field is required. Please provide your name.</div></span>
          </label>
          <input type="text" name='name' onChange={handleChange} required />
        </div>

        <div className='label-section'>
          <label>Phone number<span className="mandatory">*
            <div className="popup">This field is required. Please provide your Number.</div></span>
          </label>
          <input type="text" name='phoneNumber' onChange={handleChange} required />
        </div>

        <div className='label-section'>
          <label>Email address<span className="mandatory">*
            <div className="popup">This field is required. Please provide your Email.</div></span>
          </label>
          <input type="email" name='email' onChange={handleChange} required />
        </div>

        <div className='label-section'>
          <label>Password<span className="mandatory">*
            <div className="popup">This field is required.</div></span>
          </label>
          <input type="password" name='password' onChange={handleChange} required />
        </div>

        {error && <p className='error-mssg'>{error}</p>}

        <button type="submit" className="button">
          {loading ? <ThreeDots color="#00BFFF" height={30} width={30} /> : 'CONTINUE'}
        </button>

        <p className='text'>Have an account? <> </>
          <Link to="/signin">
            Sign in
          </Link>
        </p>
      </form>
      <Outlet />
    </div>
  );
}

export default SignUpPage;
