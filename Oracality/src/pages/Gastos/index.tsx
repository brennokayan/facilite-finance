import { Box, Container, IconButton, TableCell, TableRow } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";
import { useUser } from "../../hooks/userHooks";
import gastosService from "../../service/gastosService";
import useSWR, { mutate } from "swr";
import { TableComponent } from "../../components/table/tableGastoComponent";
import { data } from "../../types/gastoType";
import { ToBRL, ToISODate } from "../../utils/defaultFunctions";
import { ModalEditAddGastoComponent } from "./components/modalEditAdd/modalEditAddGastoComponent";
import { DefaultIcons } from "../../utils/defaultIcons";

export function PaginaGastos() {
  const dataUser = useUser()?.user;
  const {
    data: gastos,
    error,
    isLoading,
  } = useSWR("gastos", async () => {
    const response = await gastosService.getAll();
    return response.data;
  });
  if (isLoading || !gastos || !gastos.data) {
    return <p>Carregando...</p>;
  }
  if (error) {
    return <p>Erro ao carregar</p>;
  }

  return (
    <>
      <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
      <Container maxWidth="lg">
        <h1>Gastos</h1>
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}>
          <ModalEditAddGastoComponent type="ADD" />
        </Box>
        <TableComponent
          head={[
            { title: "#", aling: "center" },
            { title: "Titulo", aling: "center" },
            { title: "Valor", aling: "center" },
            { title: "Classe", aling: "center" },
            { title: "Criado em", aling: "center" },
            { title: "Esta pago", aling: "center" },
            { title: "Ações", aling: "center" },
          ]}
          Body={gastos?.data.map((item: data, index: number) => (
            <TableRow key={item.id || index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{item.titulo}</TableCell>
              <TableCell align="center">{ToBRL(item.valor)}</TableCell>
              <TableCell align="center">{item.ClasseLucro?.nome || "sem classe"}</TableCell>
              <TableCell align="center">{ToISODate(item?.criadoEm)}</TableCell>
              <TableCell align="center">
                {item.estaPago ? <p>Pago</p> : <p>Não pago</p>}
              </TableCell>
              <TableCell align="center">
                <ModalEditAddGastoComponent data={item} type="EDIT" />
                <IconButton onClick={() => {
                  gastosService.update(item.id, { estaDeletado: true }).then(() => {
                    mutate("gastos");

                  })
                }}>
                  <DefaultIcons.Deletar/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        />
      </Container>
    </>
  );
}
