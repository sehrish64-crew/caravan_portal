INSERT INTO brands (name, slug, default_color, email, website) VALUES
  ('CheckMyVan', 'checkmyvan', '#0F766E', NULL, NULL),
  ('CheckMyVehicles', 'checkmyvehicles', '#3B82F6', NULL, NULL),
  ('VehicleAnalyse', 'vehicleanalyse', '#10B981', NULL, NULL),
  ('CarIntelCheck', 'carintelcheck', '#F59E0B', NULL, NULL)
ON CONFLICT (name) DO UPDATE
SET email = CASE WHEN brands.email = 'info@example.com' THEN NULL ELSE brands.email END,
    website = CASE WHEN brands.website = 'https://example.com/' THEN NULL ELSE brands.website END;

DELETE FROM brands
WHERE name IN (
  'AutoScanOra',
  'CarReaders',
  'VehicleHealthAnalysis',
  'VehicleHealthEstimate',
  'CarBronze',
  'TrueAnalyzers',
  'TrueInspectify',
  'TrueInfoProvider',
  'CarDefiner'
)
AND NOT EXISTS (
  SELECT 1
  FROM reports
  WHERE reports.brand_id = brands.id
);
