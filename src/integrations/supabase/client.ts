
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gnsrshciphzhoqkhjcxz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imduc3JzaGNpcGh6aG9xa2hqY3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MTU0NTcsImV4cCI6MjA1NjQ5MTQ1N30.-EjcYPYGIKENcQBE0N3kSzw9HlNoSQc-6qljmOW-saQ";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
