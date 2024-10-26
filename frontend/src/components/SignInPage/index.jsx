import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import './SignInPage.css';

function SignInPage() {
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/signInDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInData)
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setError(data.message || 'Sign in failed');
      }
      // else {
      //   navigate('/welcome')
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignIn-container">
      {loading && (
        <div className="loading-overlay">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      )}
      <form className={`SignIn-form ${loading ? 'blur-content' : ''}`} onSubmit={handleSubmit}>
        <div className='label-section'>
          <h1 className='heading'>Sign in</h1>
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
        {/* <p className='text'>Forgot your password? <> </>
          <Link to="/forgot-password">
            Reset it
          </Link>
        </p> */}
        <button type="submit" className="button">CONTINUE</button>
        <p className='text'>No account? <> </>
          <Link to="/signup">
            Sign up
          </Link>
        </p>
      </form>
      <Outlet />
    </div>
  );
}

export default SignInPage;
