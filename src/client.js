
//Set up supabase
import { createClient } from '@supabase/supabase-js'


const URL = 'https://ojfcdpunodhwrrafrwja.supabase.co';

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZmNkcHVub2Rod3JyYWZyd2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4Nzg3MTEsImV4cCI6MjA0NzQ1NDcxMX0.FkJFbjm9v7tPcBVfx7hTpTANCqkMnzuZsLsBxwau99M"

export const supabase = createClient(URL, API_KEY)


