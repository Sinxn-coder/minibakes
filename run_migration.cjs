const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: 'postgresql://postgres.xrcypnyewxnsnjwsixot:minibakes%402021@aws-1-eu-central-2.pooler.supabase.com:6543/postgres'
  });

  try {
    await client.connect();
    console.log('Connected to database for migration!');

    // 1. Alter products table
    console.log('Altering products table schema...');
    await client.query(`
      ALTER TABLE public.products ADD COLUMN IF NOT EXISTS flavours TEXT[] DEFAULT '{}';
      ALTER TABLE public.products ADD COLUMN IF NOT EXISTS spreads TEXT[] DEFAULT '{}';
      ALTER TABLE public.products ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'In Stock';
      ALTER TABLE public.products ADD COLUMN IF NOT EXISTS bows BOOLEAN DEFAULT false;
      ALTER TABLE public.products ADD COLUMN IF NOT EXISTS individual_packaging BOOLEAN DEFAULT false;
      ALTER TABLE public.products ADD COLUMN IF NOT EXISTS min_qty INTEGER DEFAULT 1;
      ALTER TABLE public.products ADD COLUMN IF NOT EXISTS has_message BOOLEAN DEFAULT false;
      ALTER TABLE public.products ADD COLUMN IF NOT EXISTS has_inner_message BOOLEAN DEFAULT false;
    `);
    console.log('Products table schema updated.');

    // 2. Backfill options based on product type
    console.log('Backfilling initial product options...');
    
    // Cakes (except 3D)
    await client.query(`
      UPDATE public.products 
      SET 
        flavours = ARRAY['Vanilla', 'Chocolate', 'Red Velvet'],
        spreads = ARRAY['Nutella', 'Biscoff', 'Pistachio', 'Kinder', 'White Chocolate', 'Ferrero Rocher'],
        bows = true,
        has_message = true
      WHERE category = 'Cakes' AND id <> 'c-3d';
    `);

    // 3D Custom Cake
    await client.query(`
      UPDATE public.products 
      SET 
        flavours = ARRAY['Vanilla', 'Chocolate', 'Red Velvet'],
        spreads = ARRAY['Nutella', 'Biscoff', 'Pistachio', 'Kinder', 'White Chocolate', 'Ferrero Rocher'],
        has_message = false
      WHERE id = 'c-3d';
    `);

    // Cupcakes
    await client.query(`
      UPDATE public.products 
      SET 
        flavours = ARRAY['Vanilla', 'Chocolate', 'Red Velvet'],
        spreads = ARRAY['Nutella', 'Biscoff', 'Pistachio', 'Kinder']
      WHERE category = 'Cupcakes';
    `);

    // Cupcakes individual packaging for cu4, cu5, cu6 (White Chocolate)
    await client.query(`
      UPDATE public.products
      SET individual_packaging = true
      WHERE id IN ('cu4', 'cu5', 'cu6');
    `);

    // Cake Pops
    await client.query(`
      UPDATE public.products 
      SET 
        flavours = ARRAY['Vanilla', 'Chocolate', 'Red Velvet']
      WHERE category = 'Cake Pops';
    `);

    // Brownies
    await client.query(`
      UPDATE public.products 
      SET 
        flavours = ARRAY['Classic Chocolate'],
        spreads = ARRAY['Nutella', 'Biscoff', 'Pistachio', 'Kinder'],
        has_message = true
      WHERE category = 'Brownies';
    `);

    // Breakable Hearts
    await client.query(`
      UPDATE public.products 
      SET 
        flavours = ARRAY['Vanilla', 'Chocolate', 'Red Velvet'],
        has_message = true,
        has_inner_message = true
      WHERE category = 'Breakable Hearts';
    `);

    // Mini Cakes
    await client.query(`
      UPDATE public.products 
      SET 
        flavours = ARRAY['Classic Chocolate'],
        spreads = ARRAY['Nutella', 'Biscoff', 'Pistachio', 'Kinder'],
        min_qty = 4
      WHERE category = 'Mini Cakes';
    `);

    // Cakesicles
    await client.query(`
      UPDATE public.products 
      SET 
        flavours = ARRAY['Vanilla', 'Chocolate', 'Red Velvet'],
        individual_packaging = true,
        has_message = true
      WHERE category = 'Cakesicles';
    `);

    console.log('Product options backfilled successfully.');

    // 3. Set up storage bucket and policies
    console.log('Setting up storage bucket and policies...');
    await client.query(`
      -- Create bucket
      INSERT INTO storage.buckets (id, name, public)
      VALUES ('inspiration-images', 'inspiration-images', true)
      ON CONFLICT (id) DO NOTHING;

      -- Drop policies if exist to recreate
      DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
      DROP POLICY IF EXISTS "Public Read" ON storage.objects;
      DROP POLICY IF EXISTS "Public Update" ON storage.objects;
      DROP POLICY IF EXISTS "Public Delete" ON storage.objects;

      -- Create insert policy (Allow anyone to upload)
      CREATE POLICY "Public Upload" ON storage.objects
      FOR INSERT TO public WITH CHECK (bucket_id = 'inspiration-images');

      -- Create select policy (Allow anyone to view)
      CREATE POLICY "Public Read" ON storage.objects
      FOR SELECT TO public USING (bucket_id = 'inspiration-images');
    `);
    console.log('Storage bucket and policies configured.');

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

main();
