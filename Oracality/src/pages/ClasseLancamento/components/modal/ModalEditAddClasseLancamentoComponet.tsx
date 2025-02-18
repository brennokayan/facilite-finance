import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { DefaultIcons } from "../../../../utils/defaultIcons";
import { styleModal } from "../../../../utils/defaultFunctions";
import { dataToEditAndAddClasseLancamentoType } from "../../../../types/classeLancamentoType";
import classeLancamentoService from "../../../../service/classeLancamentoService";
import { SnackBarInfo } from "../../../../components/snackBarInfo/snackBarInfo";
import { SnackBarType } from "../../../../types/SnackBarType";
import { mutate } from "swr";

interface Props {
  data?: {
    id: string | undefined;
    nome: string | undefined;
    estaDeletado: boolean | undefined;
  };
  type: "ADD" | "EDIT";
}

export function ModalEditClasseLancamentoComponet({ data, type }: Props) {
  const [formData, setFormData] = React.useState({
    nome: data?.nome || "",
    estaDeletado: data?.estaDeletado || false,
  });
  const [open, setOpen] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState<{
    open: boolean;
    message: string;
    type: SnackBarType;
  }>({
    open: false,
    message: "",
    type: "info",
  });

  function handleClose(
    _event: React.SyntheticEvent,
    reason: "backdropClick" | "escapeKeyDown"
  ): void {
    if (reason === "escapeKeyDown") {
      setOpen(false);
      // Aqui você pode executar alguma ação específica para o ESC, se desejar
    } else if (reason === "backdropClick") {
      // Aqui, se preferir, pode ignorar o clique no fundo, por exemplo:
      setOpen(false);
    }
    setOpen(false);
  }

  async function handleEditClasseLancamento(
    data: dataToEditAndAddClasseLancamentoType,
    id: string
  ) {
    await classeLancamentoService
      .update(id, data)
      .then(() => {
        setSnackBar({
          ...snackBar,
          message: "Classe de Lançamento editada com sucesso!",
          type: "success",
          open: true,
        });
        mutate("classeLancamentos"); // Atualiza os dados da lista
        setTimeout(() => {
          setOpen(false);
        }, 750);
      })
      .catch(() => {
        setSnackBar({
          ...snackBar,
          message: "Erro ao editar Classe de Lançamento!",
          type: "error",
          open: true,
        });
      });
  }
  async function handleAddClasseLancamento(
    data: dataToEditAndAddClasseLancamentoType
  ) {
    await classeLancamentoService
      .create(data)
      .then(() => {
        setSnackBar({
          ...snackBar,
          message: "Classe de Lançamento adicionada com sucesso!",
          type: "success",
          open: true,
        });
        mutate("classeLancamentos"); // Atualiza os dados da lista
        setTimeout(() => {
          setOpen(false);
        }, 750);
      })
      .catch(() => {
        setSnackBar({
          ...snackBar,
          message: "Erro ao adicionar Classe de Lançamento!",
          type: "error",
          open: true,
        });
      });
  }

  return (
    <>
      {type === "ADD" ? (
        <>
          <Button
            sx={{ display: "flex", gap: 1 }}
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            <DefaultIcons.Adicionar size={22} /> Classe de Lançamento
          </Button>
        </>
      ) : (
        <>
          <IconButton
            color="info"
            onClick={() => {
              setOpen(true);
            }}
          >
            <DefaultIcons.Editar />
          </IconButton>
        </>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          {type === "EDIT" ? (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Classe de Lançamento
            </Typography>
          ) : (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Adicionar nova Classe de Lançamento
            </Typography>
          )}
          <Box>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {type === "EDIT" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    label="Nome"
                    defaultValue={data?.nome}
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                  />
                </Box>
              )}
            </Typography>
            <Box
              sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}
            >
              {type === "EDIT" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (data?.id) {
                      handleEditClasseLancamento(formData, data.id);
                    } else {
                      console.error("ID is undefined");
                    }
                  }}
                >
                  Salvar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleAddClasseLancamento(formData);
                    setOpen(false);
                  }}
                >
                  Adicionar
                </Button>
              )}
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <SnackBarInfo
        message={snackBar.message}
        type={snackBar.type}
        toOpen={snackBar.open}
        handleClose={() => setSnackBar({ ...snackBar, open: false })}
      />
    </>
  );
}
