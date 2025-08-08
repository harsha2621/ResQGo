import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Form Submitted', formData);
  };

  const EyeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={styles.eyeIcon}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <div style={styles.logo}>❤️</div>
        <h2 style={styles.title}>Join <strong>ResQGo</strong></h2>
        <p style={styles.subtitle}>Create your account for emergency medical services</p>

        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Password</label>
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            style={styles.passwordInput}
            required
          />
          <div onClick={() => setShowPassword(!showPassword)} style={styles.eyeWrapper}>
            <EyeIcon />
          </div>
        </div>

        <label style={styles.label}>Confirm Password</label>
        <div style={styles.passwordWrapper}>
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.passwordInput}
            required
          />
          <div onClick={() => setShowConfirm(!showConfirm)} style={styles.eyeWrapper}>
            <EyeIcon />
          </div>
        </div>

        <button type="submit" style={styles.button}>Create Account</button>

        <p style={styles.footer}>
          Already have an account? <a href="/login" style={styles.link}>Sign in here</a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 6,
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    marginBottom: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  passwordWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  passwordInput: {
    width: '100%',
    padding: '10px 36px 10px 12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  eyeWrapper: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#555',
    height: 24,
    width: 24,
  },
  eyeIcon: {
    height: 20,
    width: 20,
  },
  button: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(to right, #f44336, #e53935)',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 10,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  link: {
    color: '#e53935',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default RegisterForm;
