# Supabase Setup Guide — AURA ÉTOILE OS

Follow these 3 quick steps to deploy your live PostgreSQL backend:

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a new project.
2. **Execute Database Schema**:
   - Open the **SQL Editor** in your Supabase dashboard.
   - Copy and paste the contents of `supabase/schema.sql` and run it.
   - Run `supabase/seed.sql` to populate sample tables, cellar allocations, and tastings.
3. **Connect Frontend Environment**:
   - Copy your Project URL and anon public API key from **Settings > API**.
   - Create a `.env` file in the root of this project:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
   - Run `npm run dev` to launch the live application!
