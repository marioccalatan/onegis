import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type Table = Database["public"]["Tables"]["tables"]["Row"];
type TableInsert = Database["public"]["Tables"]["tables"]["Insert"];
type Field = Database["public"]["Tables"]["fields"]["Row"];
type FieldInsert = Database["public"]["Tables"]["fields"]["Insert"];

export const projectService = {
  // Project operations
  async createProject(name: string, userId: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from("projects")
      .insert({ name, user_id: userId })
      .select()
      .single();

    if (error) {
      console.error("Error creating project:", error);
      return null;
    }
    return data;
  },

  async getProjects(userId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
    return data || [];
  },

  async getProject(projectId: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (error) {
      console.error("Error fetching project:", error);
      return null;
    }
    return data;
  },

  async deleteProject(projectId: string): Promise<boolean> {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      console.error("Error deleting project:", error);
      return false;
    }
    return true;
  },

  // Table operations
  async createTable(tableData: Omit<TableInsert, "id" | "created_at">): Promise<Table | null> {
    const { data, error } = await supabase
      .from("tables")
      .insert(tableData)
      .select()
      .single();

    if (error) {
      console.error("Error creating table:", error);
      return null;
    }
    return data;
  },

  async getTables(projectId: string): Promise<Table[]> {
    const { data, error } = await supabase
      .from("tables")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tables:", error);
      return [];
    }
    return data || [];
  },

  async deleteTable(tableId: string): Promise<boolean> {
    const { error } = await supabase
      .from("tables")
      .delete()
      .eq("id", tableId);

    if (error) {
      console.error("Error deleting table:", error);
      return false;
    }
    return true;
  },

  // Field operations
  async createField(fieldData: Omit<FieldInsert, "id" | "created_at">): Promise<Field | null> {
    const { data, error } = await supabase
      .from("fields")
      .insert(fieldData)
      .select()
      .single();

    if (error) {
      console.error("Error creating field:", error);
      return null;
    }
    return data;
  },

  async getFields(tableId: string): Promise<Field[]> {
    const { data, error } = await supabase
      .from("fields")
      .select("*")
      .eq("table_id", tableId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching fields:", error);
      return [];
    }
    return data || [];
  },

  async deleteField(fieldId: string): Promise<boolean> {
    const { error } = await supabase
      .from("fields")
      .delete()
      .eq("id", fieldId);

    if (error) {
      console.error("Error deleting field:", error);
      return false;
    }
    return true;
  },

  // Combined operations
  async getProjectWithTablesAndFields(projectId: string) {
    const project = await this.getProject(projectId);
    if (!project) return null;

    const tables = await this.getTables(projectId);
    const tablesWithFields = await Promise.all(
      tables.map(async (table) => {
        const fields = await this.getFields(table.id);
        return { ...table, fields };
      })
    );

    return {
      project,
      tables: tablesWithFields,
    };
  },
};