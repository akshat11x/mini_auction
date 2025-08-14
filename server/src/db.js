// db.js - Supabase database client setup
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://bneyeswabcknkkkzccfs.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuZXllc3dhYmNrbmtra3pjY2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODE2NTYsImV4cCI6MjA3MDc1NzY1Nn0.VTnB9NVH0N0QtMaAn1x5_K7M0Od4wPTkaCW0Z44mBx4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
