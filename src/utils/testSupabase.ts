// Test file to verify Supabase connection
import { supabase } from '@/integrations/supabase/client';

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
    
    // Test a simple query
    const { data, error } = await supabase
      .from('cursos')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase query error:', error);
      return false;
    }
    
    console.log('Supabase connection successful!');
    console.log('Test data:', data);
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
};