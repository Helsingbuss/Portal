// /src/api/supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfjchjixpsfgxoprdsfx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmamNoaml4cHNmZ3hvcHJkc2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMjYyMjMsImV4cCI6MjA2NDcwMjIyM30.MAl-fl15C6ua-CL3-76UOCwmWs0smNapTvMLmwvT8MQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
