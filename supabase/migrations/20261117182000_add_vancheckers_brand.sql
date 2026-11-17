INSERT INTO brands (name, slug, default_color, email, website)
VALUES ('VanCheckers', 'vancheckers', '#0DA2E7', 'info@vancheckers.com', 'https://vancheckers.com/')
ON CONFLICT (name) DO NOTHING;
