import { Box, Container, IconButton, TableCell, TableRow } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";
import { useUser } from "../../hooks/userHooks";
import { ModalEditAddLucroComponent } from "./components/modalEditAdd/modalEditAddLucrosComponent";
import useSWR, { mutate } from "swr";
import lucrosService from "../../service/lucrosService";
import { TableComponent } from "../../components/table/tableGastoComponent";
import { data } from "../../types/lucroType";
import { CalcFinalValue, ToBRL, ToISODate } from "../../utils/defaultFunctions";
import { DefaultIcons } from "../../utils/defaultIcons";

export function PaginaLucros() {
  const dataUser = useUser()?.user;
  document.title = "ORCALITY - Lucros";
  const {
    data: lucros,
    error,
    isLoading,
  } = useSWR("lucros", async () => {
    const response = await lucrosService.getAll();
    return response.data;
  });
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar</div>;

  return (
    <>
      <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flex: 1,
            }}
          >
            <p>Lucro Total:</p>
            <h2>
              {ToBRL(
                CalcFinalValue(lucros?.data.map((item: data) => item.valor))
              )}
            </h2>
          </Box>
          <ModalEditAddLucroComponent type="ADD" idUsuario={dataUser?.id} />
        </Box>

        <TableComponent
          head={[
            { title: "#", aling: "center" },
            { title: "Titulo", aling: "center" },
            { title: "Valor", aling: "center" },
            { title: "Classe", aling: "center" },
            { title: "Criado em", aling: "center" },
            { title: "Ações", aling: "center" },
          ]}
          Body={lucros?.data.map((item: data, index: number) => (
            <TableRow key={item.id || index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{item.titulo}</TableCell>
              <TableCell align="center">{ToBRL(item.valor)}</TableCell>
              <TableCell align="center">
                {item.ClasseLancamento?.nome || "sem classe"}
              </TableCell>
              <TableCell align="center">{ToISODate(item?.criadoEm)}</TableCell>
              <TableCell
                align="center"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ModalEditAddLucroComponent
                  data={item}
                  type="EDIT"
                  idUsuario={dataUser?.id}
                />
                <IconButton
                  color="error"
                  onClick={() => {
                    lucrosService
                      .update(item.id, { estaDeletado: true })
                      .then(() => {
                        mutate("lucros");
                      });
                  }}
                >
                  <DefaultIcons.Deletar />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        />
      </Container>
    </>
  );
}
