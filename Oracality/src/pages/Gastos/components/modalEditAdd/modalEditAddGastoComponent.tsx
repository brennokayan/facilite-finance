import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import useSWR, { mutate } from "swr";
import { SnackBarInfo } from "../../../../components/snackBarInfo/snackBarInfo";
import { SnackBarType } from "../../../../types/SnackBarType";
import { styleModal } from "../../../../utils/defaultFunctions";
import { DefaultIcons } from "../../../../utils/defaultIcons";
import {
  data,
  dataToEditAndAddgastoAddEditType,
} from "../../../../types/gastoType";
import gastosService from "../../../../service/gastosService";
import classeLancamentoService from "../../../../service/classeLancamentoService";
import { optionsSelect } from "../renderSelectOptionsComponent";
import { NumericFormat } from "react-number-format";

interface Props {
  data?: data;
  type: "ADD" | "EDIT";
  idUsuario?: string;
}

export function ModalEditAddGastoComponent({ data, type, idUsuario }: Props) {
  const {
    data: classeLancamento,
    error,
    isLoading,
  } = useSWR("classeLancamentos", async () => {
    const response = await classeLancamentoService.getSaida();
    return response.data;
  });
  const [formData, setFormData] = React.useState({
    titulo: "",
    valor: 0,
    idUsuario: idUsuario, //"cm4lp22k90000z95wx76icoq9",
    idClasseLancamento: "",
    estaPago: true,
    estaDeletado: false,
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

  useEffect(() => {
    if (type === "EDIT" && data) {
      setFormData({
        titulo: data.titulo,
        valor: data.valor,
        idUsuario: data.idUsuario,
        idClasseLancamento: data.idClasseLancamento,
        estaPago: data.estaPago,
        estaDeletado: data.estaDeletado,
      });
    }
  }, [data, type]);

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

  async function handleEdit(
    data: dataToEditAndAddgastoAddEditType,
    id: string
  ) {
    await gastosService
      .update(id, data)
      .then(() => {
        setSnackBar({
          ...snackBar,
          message: "Gasto editado com sucesso!",
          type: "success",
          open: true,
        });
        mutate("gastos"); // Atualiza os dados da lista
        setTimeout(() => {
          setOpen(false);
        }, 750);
      })
      .catch(() => {
        setSnackBar({
          ...snackBar,
          message: "Erro ao editar Gasto!",
          type: "error",
          open: true,
        });
      });
  }

  async function handleAdd(data: dataToEditAndAddgastoAddEditType) {
    await gastosService
      .create(data)
      .then(() => {
        setSnackBar({
          ...snackBar,
          message: "Gasto adicionado com sucesso!",
          type: "success",
          open: true,
        });
        mutate("gastos"); // Atualiza os dados da lista
        setTimeout(() => {
          setOpen(false);
        }, 750);
      })
      .catch(() => {
        setSnackBar({
          ...snackBar,
          message: "Erro ao adicionar Gasto!",
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
            <DefaultIcons.Adicionar size={22} /> Gastos
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
              Editar Gasto
            </Typography>
          ) : (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Adicionar novo Gasto
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
                    label="Título"
                    defaultValue={data?.titulo}
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setFormData({ ...formData, titulo: e.target.value })
                    }
                  />
                  <NumericFormat
                    defaultValue={data?.valor}
                    required
                    thousandSeparator="."
                    decimalSeparator=","
                    // prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale={true}
                    customInput={TextField}
                    label="Valor"
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        valor: Number(
                          e.target.value.replace(".", "").replace(",", ".")
                        ),
                      })
                    }
                  />
                  <TextField
                    select
                    label="Classe de lançamento"
                    defaultValue={data?.idClasseLancamento}
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        idClasseLancamento: e.target.value,
                      })
                    }
                  >
                    {optionsSelect(isLoading, error, classeLancamento)}
                  </TextField>
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
                    label="Título"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setFormData({ ...formData, titulo: e.target.value })
                    }
                  />
                  <NumericFormat
                    required
                    thousandSeparator="."
                    decimalSeparator=","
                    // prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale={true}
                    customInput={TextField}
                    label="Valor"
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        valor: Number(
                          e.target.value.replace(".", "").replace(",", ".")
                        ),
                      })
                    }
                  />
                  <TextField
                    select
                    label="Classe de lançamento"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        idClasseLancamento: e.target.value,
                      })
                    }
                  >
                    {optionsSelect(isLoading, error, classeLancamento)}
                  </TextField>
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
                      handleEdit(formData, data.id);
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
                    handleAdd(formData);
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
