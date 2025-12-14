import { Box, Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { createCategorie } from "@/lib/service.categorie";

const FormCategorie = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await createCategorie({ name, description });
      setName("");
      setDescription("");
    } catch (error) {
      console.error("[FormCategorie] Error creando categoría:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ height: "80vh" }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <TextField
            required
            id="categorie-name"
            label="Nombre de Categoría"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <TextField
            required
            id="categorie-description"
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
          />
        </FormControl>

        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? "Creando..." : "Crear Categoría"}
        </Button>
      </form>
    </Box>
  );
};

export default FormCategorie;