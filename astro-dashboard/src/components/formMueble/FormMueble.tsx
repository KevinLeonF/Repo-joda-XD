import type { Categorie } from "@/lib/interfaces/categorie.interface";
import { listCategories } from "@/lib/service.categorie";
import { createFurniture } from "@/lib/service.furniture";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

const FormMueble = () => {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [categorieId, setCategorieId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const handleChange = (event: SelectChangeEvent<string | null>) => {
    setCategorieId(event.target.value as string);
  };

  useEffect(() => {
    const getListCategories = async () => {
      try {
        const response = await listCategories();
        console.log("[FormMueble] Categorías cargadas:", response);
        // Solo mostrar categorías activas en esta sección
        const activeOnly = (response || []).filter((c: Categorie) => c.active);
        setCategories(activeOnly);
      } catch (error) {
        console.error("[FormMueble] Error al cargar categorías:", error);
      }
    };
    getListCategories();
  }, []);

  const sendFormCreateFurniture = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFurniture({ name, price, categorieId });
      setName("");
      setPrice(0);
      setCategorieId("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ height: "80vh" }}>
      <form onSubmit={sendFormCreateFurniture}>
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <TextField
            required
            id="outlined-required"
            label="Nombre de Mueble"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <TextField
            type="number"
            required
            id="outlined-required"
            label="Precio"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="InputLabel"
            value={categorieId}
            onChange={handleChange}
          >
            {categories.map((e: Categorie) => {
              return (
                <MenuItem key={e.id} value={e.id}>
                  {e.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained">
          Crear Mueble
        </Button>
      </form>
    </Box>
  );
};
export default FormMueble;
