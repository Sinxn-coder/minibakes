const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: 'postgresql://postgres.xrcypnyewxnsnjwsixot:minibakes%402021@aws-1-eu-central-2.pooler.supabase.com:6543/postgres'
  });

  try {
    await client.connect();
    console.log("Connected. Setting up Instagram tables...");

    await client.query('BEGIN');

    // 1. Create api_keys table to store secrets securely
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.api_keys (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );

      ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

      -- Only authenticated (admin) users can read api_keys
      DROP POLICY IF EXISTS "Admin read api_keys" ON public.api_keys;
      CREATE POLICY "Admin read api_keys" ON public.api_keys
        FOR ALL TO authenticated USING (true) WITH CHECK (true);

      -- No public/anon access at all
    `);

    // 2. Store the Meta App credentials
    await client.query(`
      INSERT INTO public.api_keys (key, value)
      VALUES ('meta_access_token', '964218176615723|b5c93e7b3b552e6d68c88d90abc39361')
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
    `);

    // 3. Create instagram_reels table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.instagram_reels (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        reel_url TEXT NOT NULL,
        display_order INT DEFAULT 0,
        thumbnail_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );

      ALTER TABLE public.instagram_reels ENABLE ROW LEVEL SECURITY;

      -- Public can read reels
      DROP POLICY IF EXISTS "Public read reels" ON public.instagram_reels;
      CREATE POLICY "Public read reels" ON public.instagram_reels
        FOR SELECT TO anon USING (true);

      -- Only admins can insert/update/delete
      DROP POLICY IF EXISTS "Admin all reels" ON public.instagram_reels;
      CREATE POLICY "Admin all reels" ON public.instagram_reels
        FOR ALL TO authenticated USING (true) WITH CHECK (true);
    `);

    await client.query('COMMIT');
    console.log("Instagram tables created successfully!");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();
