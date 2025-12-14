import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table as MuiTable, TextField } from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import moment from "moment";
import type { Categorie } from "@/lib/interfaces/categorie.interface";
import { deleteCategorieById, editCategorieCompleteById, getCategorieById, listCategories, reactivateCategorieById } from "@/lib/service.categorie";

export const TableCategorie = () => {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [categorieId, setCategorieId] = useState("");

  const getListCategories = async () => {
    const response = await listCategories();
    setCategories(response);
  };

  const handleOpenEdit = async (cat: Categorie) => {
    setOpenEdit(true);
    const response = await getCategorieById(cat.id);
    setEditName(response.name);
    setEditDescription(response.description ?? "");
    setCategorieId(cat.id);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDeleteConfirm = (cat: Categorie) => {
    setOpenDeleteConfirm(true);
    setCategorieId(cat.id);
  };

  const handleCloseDeleteConfirm = () => setOpenDeleteConfirm(false);

  useEffect(() => {
    getListCategories();
  }, []);

  // Ordenar activos primero para que aparezcan arriba en la tabla
  const categoriesSorted: Categorie[] = [...categories].sort(
    (a, b) => Number(b.active) - Number(a.active)
  );

  const handleSubmitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await editCategorieCompleteById(categorieId, { name: editName, description: editDescription });
    await getListCategories();
    handleCloseEdit();
  };

  const deleteConfirm = async () => {
    await deleteCategorieById(categorieId);
    await getListCategories();
    handleCloseDeleteConfirm();
  };

  const handleReactivateCategorie = async (id: string) => {
    await reactivateCategorieById(id);
    await getListCategories();
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 600}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Descripción</TableCell>
              <TableCell align="right">Activo</TableCell>
              <TableCell align="right">Fecha Creación</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesSorted.map((cat: Categorie, idx) => (
              <TableRow key={cat.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">{idx + 1}</TableCell>
                <TableCell>{cat.name}</TableCell>
                <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "anywhere" }}>{cat.description}</TableCell>
                <TableCell align="right">
                  {cat.active ? (
                    <Chip label="Activo" color="success" />
                  ) : (
                    <Chip label="Desactivado" color="error" />
                  )}
                </TableCell>
                <TableCell align="right">{moment(cat.createdAt).format("DD/MM/YYYY HH:mm")}</TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenEdit(cat)}
                  >
                    Editar
                  </Button>
                  {cat.active ? (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenDeleteConfirm(cat)}
                      sx={{ ml: 1 }}
                    >
                      Eliminar
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleReactivateCategorie(cat.id)}
                      sx={{ ml: 1 }}
                    >
                      Reactivar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Editar Categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>Editar nombre y descripción</DialogContentText>
          <form onSubmit={handleSubmitEdit} id="edit-categorie-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Nombre Categoría"
              type="text"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              variant="standard"
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Descripción"
              type="text"
              fullWidth
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancelar</Button>
          <Button type="submit" form="edit-categorie-form">Editar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar Categoría?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Una vez eliminada esta categoría no podrá ser rescatada
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancelar</Button>
          <Button onClick={deleteConfirm} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableCategorie;

