import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function AuthPanel({ user, onAuth, onLogout }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setError('Signup successful! Please check your email for confirmation.');
  };

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else onAuth(data.user);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  if (user) {
    return (
      <div style={{ marginBottom: 16 }}>
        <span>Logged in as: {user.email}</span>
        <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button onClick={signUp} style={{ marginRight: 8 }}>Sign Up</button>
      <button onClick={signIn}>Login</button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
}