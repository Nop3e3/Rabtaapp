import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pymaqejunqadcxavrlpd.supabase.co'
const supabaseKey='sb_publishable_R_ARD5x6oetpsR1hGNBP7g_mTgaeUk3'
export const supabase = createClient(
  "https://pymaqejunqadcxavrlpd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bWFxZWp1bnFhZGN4YXZybHBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ2NjA5OCwiZXhwIjoyMDkwMDQyMDk4fQ.Q6xmvNDktoRDRlwW04lC1lRvwOOpXE3IqQaY59dnEmc"
);