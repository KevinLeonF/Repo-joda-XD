import {
  deleteFurnitureById,
  editFurnitureCompleteById,
  getFurnitureById,
  listFurniture,
  reactivateFurnitureById,
} from "@/lib/service.furniture";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table as MuiTable,
  TextField,
} from "@mui/material";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import type { Furniture } from "@/lib/interfaces/furniture.interface";
import { controlPermisosFrontend } from "@/lib/control.permission";
import moment from "moment";

export const Table = () => {
  const [furniture, setFurniture] = useState([]);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [furnitureId, setFurnitureId] = useState("");
  ////////////////////////////////////////////////
  const [openx, setOpenx] = React.useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);


  const getListFurniture = async () => {
    const response = await listFurniture();
    console.log(response);
    setFurniture(response);
  };

  const handleClickOpenDialogConfirm = (furniture: Furniture) => {
    setOpenDialogConfirm(true);
    setFurnitureId(furniture.id);
  };

  const handleCloseDialogConfirm = () => {
    setOpenDialogConfirm(false);
  };

  const handleClickOpen = async (furniture: Furniture) => {
    setOpenx(true);
    const response = await getFurnitureById(furniture.id);
    setEditName(response.name);
    setEditPrice(response.price);
    setFurnitureId(furniture.id);
  };

  const deleteConfirmDialog = async () => {
    await deleteFurnitureById(furnitureId);
    getListFurniture();
    setOpenDialogConfirm(false);
  };

  const handleReactivateFurniture = async (id: string) => {
    await reactivateFurnitureById(id);
    await getListFurniture();
  };

  const handleClose = () => {
    setOpenx(false);
  };
  //////////////////////////////////////////////////
  useEffect(() => {
    getListFurniture();
  }, []);

  // Ordenar activos primero para que aparezcan arriba en la tabla
  const furnitureSorted: Furniture[] = [...(furniture as Furniture[])].sort(
    (a, b) => Number(b.active) - Number(a.active)
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("envio edicion");
    const response = await editFurnitureCompleteById(furnitureId, {
      name: editName,
      price: editPrice,
    });
    console.log(response);
    getListFurniture();
    handleClose();
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
            {furnitureSorted.map((furniture: Furniture, idx) => (
              <TableRow
                key={furniture.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell>{furniture.name}</TableCell>
                <TableCell align="right">{furniture.price} Bs.</TableCell>
                <TableCell align="right">{
                  furniture.active?
                    <Chip label="Activo" color="success" />
                  :
                    <Chip label="Desactivado" color ="error" />

                }</TableCell>
                <TableCell align="right">
                  {moment(furniture.createdAt).format("DD/MM/YYYY HH:mm")}
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      handleClickOpen(furniture);
                    }}
                  >
                    Editar
                  </Button>
                  {furniture.active ? (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        handleClickOpenDialogConfirm(furniture);
                      }}
                      sx={{ ml: 1 }}
                    >
                      Eliminar
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleReactivateFurniture(furniture.id)}
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

        <Dialog open={openx} onClose={handleClose}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>Editar producto</DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Nombre Mueble"
              type="text"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              variant="standard"
            />

            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              label="Precio Mueble"
              type="number"
              fullWidth
              value={editPrice}
              onChange={(e) => setEditPrice(Number(e.target.value))}
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" form="subscription-form">
            Editar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialogConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar Mueble?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Una vez eliminado este mueble no podra ser rescatado
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogConfirm}>Cancelar</Button>
          <Button onClick={deleteConfirmDialog} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
