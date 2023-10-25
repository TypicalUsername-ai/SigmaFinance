import { createContext } from "react"
import { createClient } from "@supabase/supabase-js"

const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNjk4MDk4NDAwLAogICJleHAiOiAxODU1OTUxMjAwCn0.UJRB5l8gbuhsMFo5T9RV_DeMr3_1x4jd1f40SKm6F-s'

export const SupabaseContext = createContext(createClient('http://localhost:8000', anon_key))
