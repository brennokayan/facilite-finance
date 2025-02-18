import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { DefaultIcons } from "../../../../utils/defaultIcons";
import classeLancamentoService from "../../../../service/classeLancamentoService";
import { mutate } from "swr";
import { SnackBarInfo } from "../../../../components/snackBarInfo/snackBarInfo";
import { SnackBarType } from "../../../../types/SnackBarType";

interface Props {
  data?: {
    id: string | undefined;
    nome: string | undefined;
  };
}

export function ModalDeleteClasseLancamentoComponent({ data }: Props) {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    color: "text.primary",
  };

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

  return (
    <>
      <IconButton
        color="error"
        onClick={() => {
          setOpen(true);
        }}
      >
        <DefaultIcons.Deletar />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deletar classe de lançamento
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Deseja mesmo deletear a classe de lançamento: <strong>{data?.nome}</strong>? Esta
            ação NÃO poderá ser desfeita.
          </Typography>

          <Box
            sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (data?.id) {
                  classeLancamentoService
                    .update(data.id, {
                      estaDeletado: true,
                      nome: data?.nome,
                    })
                    .then(() => {
                      setSnackBar({
                        ...snackBar,
                        message: "Classe de Lançamento deletada com sucesso!",
                        type: "success",
                        open: true,
                      });
                      mutate("classeLancamentos"); // Atualiza os dados da lista
                    })
                    .catch(() => {
                      setSnackBar({
                        ...snackBar,
                        message:
                          "Opps... Erro ao deletar Classe de Lançamento!",
                        type: "error",
                        open: true,
                      });
                    });
                } else {
                  setSnackBar({
                    ...snackBar,
                    message:
                      "Opps... Não foi possível encontrar a Classe de Lançamento!",
                    type: "error",
                    open: true,
                  });
                }
                setOpen(false);
              }}
            >
              Salvar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
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
