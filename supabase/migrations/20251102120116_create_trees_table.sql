/*
  # Create trees table

  1. New Tables
    - `trees`
      - `id` (uuid, primary key) - Unique identifier for each tree
      - `code` (text, unique) - Barcode/QR code identifier
      - `name` (text) - Common name of the tree
      - `scientific_name` (text) - Scientific/Latin name
      - `family` (text) - Botanical family
      - `description` (text) - Detailed description
      - `characteristics` (text) - Key characteristics
      - `habitat` (text) - Natural habitat information
      - `uses` (text) - Traditional and modern uses
      - `image_url` (text) - URL to tree image
      - `height_range` (text) - Typical height range
      - `created_at` (timestamptz) - Record creation timestamp
      
  2. Security
    - Enable RLS on `trees` table
    - Add policy for public read access (anyone can view tree information)
    - This is appropriate as tree information is public educational content
*/

CREATE TABLE IF NOT EXISTS trees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  scientific_name text NOT NULL,
  family text NOT NULL,
  description text NOT NULL,
  characteristics text DEFAULT '',
  habitat text DEFAULT '',
  uses text DEFAULT '',
  image_url text DEFAULT '',
  height_range text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view trees"
  ON trees
  FOR SELECT
  TO anon, authenticated
  USING (true);