-- Create a simple users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert some dummy data if the table is empty
INSERT INTO users (name, email) VALUES
('Alice Smith', 'alice@example.com'),
('Bob Johnson', 'bob@example.com')
ON CONFLICT (email) DO NOTHING;
