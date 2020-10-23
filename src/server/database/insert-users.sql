-- The password is hashed, the actual pass is Admin123 which should be changed
INSERT INTO users (username, password, admin, updated_at) VALUES ('admin1', '$2b$10$MzVE6X2Tbj2YuV0ETpJ2NuGpEePYNYLvuvnjsXyJkN9kMdcym1Sna', true, now());
