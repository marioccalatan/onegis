-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own projects" ON projects FOR DELETE USING (auth.uid() = user_id);

-- Create tables table (for storing table definitions)
CREATE TABLE project_tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  table_type TEXT NOT NULL CHECK (table_type IN ('standard', 'geometry')),
  geometry_type TEXT CHECK (geometry_type IN ('Point', 'Line', 'Polygon')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE project_tables ENABLE ROW LEVEL SECURITY;

-- Create policies (access through project ownership)
CREATE POLICY "Users can view tables of their projects" ON project_tables FOR SELECT USING (
  EXISTS (SELECT 1 FROM projects WHERE projects.id = project_tables.project_id AND projects.user_id = auth.uid())
);
CREATE POLICY "Users can insert tables to their projects" ON project_tables FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM projects WHERE projects.id = project_tables.project_id AND projects.user_id = auth.uid())
);
CREATE POLICY "Users can update tables of their projects" ON project_tables FOR UPDATE USING (
  EXISTS (SELECT 1 FROM projects WHERE projects.id = project_tables.project_id AND projects.user_id = auth.uid())
);
CREATE POLICY "Users can delete tables from their projects" ON project_tables FOR DELETE USING (
  EXISTS (SELECT 1 FROM projects WHERE projects.id = project_tables.project_id AND projects.user_id = auth.uid())
);

-- Create fields table
CREATE TABLE table_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID NOT NULL REFERENCES project_tables(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  field_type TEXT NOT NULL CHECK (field_type IN ('text', 'number', 'boolean', 'dropdown')),
  is_required BOOLEAN DEFAULT FALSE,
  dropdown_options TEXT[], -- Array of options for dropdown fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE table_fields ENABLE ROW LEVEL SECURITY;

-- Create policies (access through table ownership)
CREATE POLICY "Users can view fields of their tables" ON table_fields FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM project_tables 
    JOIN projects ON projects.id = project_tables.project_id 
    WHERE project_tables.id = table_fields.table_id AND projects.user_id = auth.uid()
  )
);
CREATE POLICY "Users can insert fields to their tables" ON table_fields FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM project_tables 
    JOIN projects ON projects.id = project_tables.project_id 
    WHERE project_tables.id = table_fields.table_id AND projects.user_id = auth.uid()
  )
);
CREATE POLICY "Users can update fields of their tables" ON table_fields FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM project_tables 
    JOIN projects ON projects.id = project_tables.project_id 
    WHERE project_tables.id = table_fields.table_id AND projects.user_id = auth.uid()
  )
);
CREATE POLICY "Users can delete fields from their tables" ON table_fields FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM project_tables 
    JOIN projects ON projects.id = project_tables.project_id 
    WHERE project_tables.id = table_fields.table_id AND projects.user_id = auth.uid()
  )
);