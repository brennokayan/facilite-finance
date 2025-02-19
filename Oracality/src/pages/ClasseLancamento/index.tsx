// ClasseLancamento.tsx
import { Box, Container, TableCell, TableRow } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";
import { useUser } from "../../hooks/userHooks";
import useSWR from "swr";
import classeLancamentoService from "../../service/classeLancamentoService";
import { ModalEditClasseLancamentoComponet } from "./components/modal/ModalEditAddClasseLancamentoComponet";
import { ModalDeleteClasseLancamentoComponent } from "./components/modal/ModalDeleteClasseLancamentoComponent";
import { data } from "../../types/classeLancamentoType";
import { TableComponent } from "../../components/table/tableGastoComponent";

export function ClasseLancamento() {
  document.title = "ORCALITY - Classe de Lançamento";

  const dataUser = useUser()?.user;

  // Usando SWR para buscar os dados com a chave "classeLancamentos"
  const { data: classeLancamento, error, isLoading } = useSWR(
    "classeLancamentos",
    async () => {
      const response = await classeLancamentoService.getAll();
      return response.data;
    }
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os dados</div>;

  return (
    <>
      <ComponenteNavBar nomeUsuario={dataUser?.nome || ""} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>Classe de Lançamento</h1>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mb: 2,
          }}
        >
          {/* Ao abrir o modal de ADD, após a operação o SWR revalida a chave "classeLancamentos" */}
          <ModalEditClasseLancamentoComponet type="ADD" />
        </Box>
        <TableComponent
          head={[
            { title: "#", aling: "center" },
            { title: "Nome", aling: "center" },
            { title: "Estado", aling: "center" },
            { title: "Ações", aling: "center" },
          ]}
          Body={classeLancamento?.data.map((item: data, index: number) => (
            <TableRow key={item.id || index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{item.nome}</TableCell>
              <TableCell align="center">
                {!item.estaDeletado ? <p>Ativo</p> : <p>Desativado</p>}
              </TableCell>
              <TableCell align="center">
                <ModalEditClasseLancamentoComponet
                  data={{
                    id: item.id,
                    nome: item.nome,
                    estaDeletado: item.estaDeletado,
                  }}
                  type="EDIT"
                />
                <ModalDeleteClasseLancamentoComponent
                  data={{
                    id: item.id,
                    nome: item.nome,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        />
      </Container>
    </>
  );
}
