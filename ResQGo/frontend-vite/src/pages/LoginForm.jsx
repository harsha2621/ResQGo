import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.logo}>❤️</div>
        <h2 style={styles.heading}>Welcome back to <strong>ResQGo</strong></h2>
        <p style={styles.subheading}>Sign in to your account to continue</p>

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

        <label style={styles.label}>Password</label>
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            style={styles.passwordInput}
            required
          />
          <div onClick={() => setShowPassword(!showPassword)} style={styles.eyeWrapper}>
            <EyeIcon />
          </div>
        </div>

        <button type="submit" style={styles.button}>Sign In</button>

        <p style={styles.footer}>
          Don't have an account? <a href="/register" style={styles.link}>Sign up here</a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 10,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 10,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 20,
  },
  subheading: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
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
    color: '#444',
  },
  link: {
    color: '#e53935',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default LoginForm;
// import React, { useState } from 'react';
// import { Eye } from 'lucide-react';

// const LoginForm = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible((prev) => !prev);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.logoContainer}>
//         <div style={styles.logo}>
//           <span role="img" aria-label="heart" style={styles.heartIcon}>❤️</span>
//         </div>
//       </div>

//       <h2 style={styles.heading}>Welcome back to <span style={styles.brand}>ResQGo</span></h2>
//       <p style={styles.subheading}>Sign in to your account to continue</p>

//       <form style={styles.form}>
//         <label style={styles.label}>Email</label>
//         <input type="email" placeholder="Enter your email" style={styles.input} />

//         <label style={styles.label}>Password</label>
//         <div style={styles.passwordContainer}>
//           <input
//             type={passwordVisible ? 'text' : 'password'}
//             placeholder="Enter your password"
//             style={styles.input}
//           />
//           <span onClick={togglePasswordVisibility} style={styles.eyeIcon}>
//             <Eye size={18} />
//           </span>
//         </div>

//         <button type="submit" style={styles.button}>Sign In</button>
//       </form>

//       <p style={styles.footerText}>
//         Don't have an account? <a href="#" style={styles.link}>Sign up here</a>
//       </p>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: 400,
//     margin: '40px auto',
//     padding: 32,
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//     fontFamily: 'Arial, sans-serif',
//   },
//   logoContainer: {
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   logo: {
//     backgroundColor: '#e61919',
//     borderRadius: '50%',
//     width: 48,
//     height: 48,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: '0 auto',
//   },
//   heartIcon: {
//     fontSize: 20,
//     color: '#fff',
//   },
//   heading: {
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: 700,
//     marginBottom: 4,
//   },
//   brand: {
//     fontWeight: 900,
//   },
//   subheading: {
//     textAlign: 'center',
//     fontSize: 12, // Reduced font size
//     color: '#666',
//     marginBottom: 24,
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   label: {
//     fontWeight: 600,
//     marginBottom: 6,
//     fontSize: 14,
//   },
//   input: {
//     padding: '10px 12px',
//     marginBottom: 16,
//     borderRadius: 6,
//     border: '1px solid #ccc',
//     fontSize: 14,
//     width: '100%',
//     boxSizing: 'border-box',
//   },
//   passwordContainer: {
//     position: 'relative',
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 12,
//     top: '50%',
//     transform: 'translateY(-50%)',
//     cursor: 'pointer',
//     color: '#888',
//   },
//   button: {
//     padding: '12px 0',
//     background: 'linear-gradient(to right, #f12711, #f50000)',
//     color: '#fff',
//     border: 'none',
//     borderRadius: 6,
//     fontSize: 16,
//     fontWeight: 600,
//     cursor: 'pointer',
//     marginTop: 8,
//   },
//   footerText: {
//     marginTop: 20,
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#444',
//   },
//   link: {
//     color: '#e61919',
//     fontWeight: 600,
//     textDecoration: 'none',
//   },
// };

// export default LoginForm;
