import React from 'react'
import ReactDOM from 'react-dom/client'
// import './mvp.css'
import './index.css'
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom'
import routes from "./components/routes.jsx"
import { SupabaseContext } from './supabaseContext'
import { createClient } from '@supabase/supabase-js'

const router = createBrowserRouter(routes);

const supabase = createClient('http://localhost:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNjk4MDk4NDAwLAogICJleHAiOiAxODU1OTUxMjAwCn0.UJRB5l8gbuhsMFo5T9RV_DeMr3_1x4jd1f40SKm6F-s')

ReactDOM.createRoot(document.getElementById('root')).render(
  <SupabaseContext.Provider value={supabase}>
      <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </SupabaseContext.Provider>
)
