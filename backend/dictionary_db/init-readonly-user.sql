CREATE USER dictreader;
GRANT CONNECT ON DATABASE dictionary TO dictreader;
GRANT USAGE ON SCHEMA public TO dictreader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO dictreader;
