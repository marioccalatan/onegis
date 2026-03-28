import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Table, MapPin, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectService } from "@/services/projectService";
import type { Database } from "@/integrations/supabase/types";

type TableRow = Database["public"]["Tables"]["tables"]["Row"];
type FieldRow = Database["public"]["Tables"]["fields"]["Row"];

interface TableWithFields extends TableRow {
  fields: FieldRow[];
}

export function SchemaTab({ projectId }: { projectId: string }) {
  const [tables, setTables] = useState<TableWithFields[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFieldDialogOpen, setIsFieldDialogOpen] = useState(false);
  const [currentTableId, setCurrentTableId] = useState<string | null>(null);
  const [tableType, setTableType] = useState<"standard" | "geometry">("standard");
  const [creating, setCreating] = useState(false);
  const [addingField, setAddingField] = useState(false);
  
  const [newTable, setNewTable] = useState({
    name: "",
    geometryType: "point" as "point" | "line" | "polygon",
  });

  const [newField, setNewField] = useState({
    name: "",
    type: "text" as "text" | "number" | "boolean" | "dropdown",
    required: false,
    options: [] as string[],
  });

  const [dropdownOptions, setDropdownOptions] = useState("");

  useEffect(() => {
    loadTables();
  }, [projectId]);

  const loadTables = async () => {
    setLoading(true);
    const data = await projectService.getTables(projectId);
    const tablesWithFields = await Promise.all(
      data.map(async (table) => {
        const fields = await projectService.getFields(table.id);
        return { ...table, fields };
      })
    );
    setTables(tablesWithFields);
    setLoading(false);
  };

  const handleCreateTable = async () => {
    if (!newTable.name.trim()) return;

    setCreating(true);
    const tableData = {
      project_id: projectId,
      name: newTable.name,
      type: tableType,
      geometry_type: tableType === "geometry" ? newTable.geometryType : null,
    };

    const table = await projectService.createTable(tableData);
    if (table) {
      setTables([{ ...table, fields: [] }, ...tables]);
      setNewTable({ name: "", geometryType: "point" });
      setIsCreateDialogOpen(false);
      setTableType("standard");
    }
    setCreating(false);
  };

  const handleAddField = async () => {
    if (!newField.name.trim() || !currentTableId) return;

    setAddingField(true);
    const fieldData = {
      table_id: currentTableId,
      name: newField.name,
      type: newField.type,
      required: newField.required,
      options: newField.type === "dropdown" 
        ? dropdownOptions.split(",").map(opt => opt.trim()).filter(Boolean)
        : null,
    };

    const field = await projectService.createField(fieldData);
    if (field) {
      setTables(tables.map(table => 
        table.id === currentTableId
          ? { ...table, fields: [...table.fields, field] }
          : table
      ));

      setNewField({ name: "", type: "text", required: false, options: [] });
      setDropdownOptions("");
      setIsFieldDialogOpen(false);
    }
    setAddingField(false);
  };

  const openFieldDialog = (tableId: string) => {
    setCurrentTableId(tableId);
    setIsFieldDialogOpen(true);
  };

  const handleDeleteTable = async (tableId: string) => {
    const success = await projectService.deleteTable(tableId);
    if (success) {
      setTables(tables.filter(t => t.id !== tableId));
    }
  };

  const handleDeleteField = async (tableId: string, fieldId: string) => {
    const success = await projectService.deleteField(fieldId);
    if (success) {
      setTables(tables.map(table =>
        table.id === tableId
          ? { ...table, fields: table.fields.filter(f => f.id !== fieldId) }
          : table
      ));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
          <p className="text-sm text-muted-foreground">Loading schema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold">Schema Management</h2>
          <p className="text-muted-foreground mt-1">
            Create and manage tables for your project
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Table
        </Button>
      </div>

      {tables.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Table className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No tables yet</h3>
            <p className="text-muted-foreground text-center mb-4 max-w-md">
              Get started by creating your first table. Choose between standard tables or geometry tables for spatial data.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Table
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {tables.map((table) => (
            <Card key={table.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {table.type === "geometry" ? (
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Table className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <CardTitle>{table.name}</CardTitle>
                      <CardDescription>
                        {table.type === "geometry" 
                          ? `Geometry Table (${table.geometry_type})` 
                          : "Standard Table"} • {table.fields.length} fields
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openFieldDialog(table.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Field
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteTable(table.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {table.fields.length > 0 && (
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold mb-3">Fields</h4>
                    {table.fields.map((field) => (
                      <div 
                        key={field.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{field.name}</span>
                              {field.required && (
                                <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">
                                  Required
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Type: {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                              {field.type === "dropdown" && field.options && (
                                <span> • Options: {(field.options as string[]).join(", ")}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteField(table.id, field.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Create Table Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Table</DialogTitle>
            <DialogDescription>
              Choose between a standard table or geometry table for spatial data.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={tableType} onValueChange={(v) => setTableType(v as "standard" | "geometry")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="standard">Standard Table</TabsTrigger>
              <TabsTrigger value="geometry">Geometry Table</TabsTrigger>
            </TabsList>

            <TabsContent value="standard" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="table-name">Table Name</Label>
                <Input
                  id="table-name"
                  placeholder="e.g., Customers, Inventory"
                  value={newTable.name}
                  onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && !creating && handleCreateTable()}
                  disabled={creating}
                />
              </div>
            </TabsContent>

            <TabsContent value="geometry" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="geo-table-name">Table Name</Label>
                <Input
                  id="geo-table-name"
                  placeholder="e.g., Roads, Buildings, Parcels"
                  value={newTable.name}
                  onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && !creating && handleCreateTable()}
                  disabled={creating}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="geometry-type">Geometry Type</Label>
                <Select
                  value={newTable.geometryType}
                  onValueChange={(v) => setNewTable({ ...newTable, geometryType: v as "point" | "line" | "polygon" })}
                  disabled={creating}
                >
                  <SelectTrigger id="geometry-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="point">Point</SelectItem>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={creating}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateTable} disabled={creating}>
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Table"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Field Dialog */}
      <Dialog open={isFieldDialogOpen} onOpenChange={setIsFieldDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Field</DialogTitle>
            <DialogDescription>
              Create a new field for your table with custom properties.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="field-name">Field Name</Label>
              <Input
                id="field-name"
                placeholder="e.g., Address, Phone Number"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                disabled={addingField}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-type">Field Type</Label>
              <Select
                value={newField.type}
                onValueChange={(v) => setNewField({ ...newField, type: v as typeof newField.type })}
                disabled={addingField}
              >
                <SelectTrigger id="field-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="dropdown">Dropdown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newField.type === "dropdown" && (
              <div className="space-y-2">
                <Label htmlFor="dropdown-options">Dropdown Options</Label>
                <Input
                  id="dropdown-options"
                  placeholder="Option1, Option2, Option3"
                  value={dropdownOptions}
                  onChange={(e) => setDropdownOptions(e.target.value)}
                  disabled={addingField}
                />
                <p className="text-xs text-muted-foreground">
                  Separate options with commas
                </p>
              </div>
            )}

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="required-field">Required Field</Label>
                <p className="text-xs text-muted-foreground">
                  This field must be filled out
                </p>
              </div>
              <Switch
                id="required-field"
                checked={newField.required}
                onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                disabled={addingField}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsFieldDialogOpen(false)}
              disabled={addingField}
            >
              Cancel
            </Button>
            <Button onClick={handleAddField} disabled={addingField}>
              {addingField ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Field"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}