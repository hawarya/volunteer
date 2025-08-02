'use client';
import { useState } from 'react';
import styles from '../../styles/auth.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate against backend
      // For demo purposes, create a mock user or use existing signup data
      let userData;
      const existingUser = localStorage.getItem('currentUser');
      
      if (existingUser) {
        // Update existing user's login time
        userData = {
          ...JSON.parse(existingUser),
          loginTime: new Date().toISOString()
        };
      } else {
        // Create mock user data for demo
        userData = {
          id: Date.now(),
          role: formData.role,
          email: formData.email,
          firstName: formData.role === 'admin' ? 'Admin' : 'John',
          lastName: formData.role === 'admin' ? 'User' : 'Doe',
          username: formData.email.split('@')[0],
          phone: '9876543210',
          skills: formData.role === 'volunteer' ? 'Event Management, Communication' : '',
          availability: formData.role === 'volunteer' ? 'weekends' : '',
          loginTime: new Date().toISOString(),
          signupTime: new Date().toISOString()
        };
      }
      
      localStorage.setItem('currentUser', JSON.stringify(userData));

      // Simulate login and redirect based on role
      if (formData.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/volunteer');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Role *</label>
            <select 
              name="role"
              value={formData.role} 
              onChange={handleChange} 
              className={`${styles.input} ${errors.role ? styles.error : ''}`}
            >
              <option value="">Select your role</option>
              <option value="admin">Admin</option>
              <option value="volunteer">Volunteer</option>
            </select>
            {errors.role && <span className={styles.errorText}>{errors.role}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password *</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`${styles.input} ${errors.password ? styles.error : ''}`}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          <div className={styles.forgotPassword}>
            <Link href="/forgot-password" className={styles.link}>Forgot your password?</Link>
          </div>

          <button 
            type="submit" 
            className={`${styles.button} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Don't have an account? <Link href="/signup" className={styles.link}>Create one here</Link></p>
        </div>
      </div>
    </div>
  );
}
