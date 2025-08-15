import { useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const runtimeEnv = (typeof window !== 'undefined' && window.__ENV) ? window.__ENV : {};
const SUPABASE_URL = runtimeEnv.REACT_APP_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = runtimeEnv.REACT_APP_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn('Supabase URL/key missing. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY (or server env SUPABASE_*)');
}

const getSupabase = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

export default function AuthPanel({ user, onAuth, onLogout }) {
  const supabase = useMemo(() => getSupabase(), []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signUp = async () => {
    if (!supabase) {
      setError('Supabase is not configured. Please set env variables.');
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setError('Signup successful! Please check your email for confirmation.');
  };

  const signIn = async () => {
    if (!supabase) {
      setError('Supabase is not configured. Please set env variables.');
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else onAuth(data.user);
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
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

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return (
      <div style={{ marginBottom: 16, color: 'red' }}>
        Supabase not configured. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY (or Render env SUPABASE_URL and SUPABASE_ANON_KEY).
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