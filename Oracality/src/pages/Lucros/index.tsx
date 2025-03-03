import { Box, Container, IconButton, TableCell, TableRow } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";
import { ModalEditAddLucroComponent } from "./components/modalEditAdd/modalEditAddLucrosComponent";
import useSWR, { mutate } from "swr";
import lucrosService from "../../service/lucrosService";
import { TableComponent } from "../../components/table/tableGastoComponent";
import { data } from "../../types/lucroType";
import {
  CalcFinalValue,
  ToBRL,
  ToISODate,
  getDataUserInCoockie,
  getDefaultDates,
} from "../../utils/defaultFunctions";
import { DefaultIcons } from "../../utils/defaultIcons";
import React from "react";
import { FilterControls } from "../../components/filterComponet";
import classeLancamentoService from "../../service/classeLancamentoService";
import { filtersType } from "../../types/filterType";
import { getToken } from "../../utils/login";

export function PaginaLucros() {
  const dataUser = getDataUserInCoockie();
  document.title = "ORCALITY - Lucros";

  // Datas padrão para os filtros
  const { dataInicio: defaultDataInicio, dataFim: defaultDataFim } =
    getDefaultDates();

  // Estado dos filtros (ordenacao, campo e intervalo de datas)
  const [filters, setFilters] = React.useState<filtersType>({
    ordem: "desc" as "asc" | "desc",
    field: "criadoEm" as "criadoEm" | "valor",
    dataInicio: defaultDataInicio,
    dataFim: defaultDataFim,
  });

  // SWR para buscar as classes de lançamento referentes a entradas (para lucros)
  const {
    data: classesLancamentoOptions,
    error: errorClassesLancamento,
    isLoading: isLoadingClassesLancamento,
  } = useSWR("classesLancamento", async () => {
    const response = await classeLancamentoService.getEntrada();
    return response.data;
  });

  // SWR para buscar os lucros com os filtros aplicados
  const {
    data: lucros,
    error,
    isLoading,
  } = useSWR(["lucros", filters], async () => {
    const response = await lucrosService.getAll(filters);
    return response.data;
  });

  // Cálculo da classe mais usada com base nos dados dos lucros
  const mostUsedClass = React.useMemo(() => {
    if (!lucros || !lucros.data || lucros.data.length === 0) return "";
    const frequency: Record<string, number> = {};
    lucros.data.forEach((item: data) => {
      const classId = item.idClasseLancamento;
      if (classId) {
        frequency[classId] = (frequency[classId] || 0) + 1;
      }
    });
    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    return sorted[0] ? sorted[0][0] : "";
  }, [lucros]);

  const classCounts = React.useMemo(() => {
    if (!lucros || !lucros.data) return {};
    return lucros.data.reduce((acc: Record<string, number>, item: data) => {
      const id = item.idClasseLancamento;
      if (id) {
        acc[id] = (acc[id] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [lucros]);

  if (isLoading || isLoadingClassesLancamento) {
    return <div>Carregando...</div>;
  }
  if (error || errorClassesLancamento) {
    return <div>Erro ao carregar</div>;
  }

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
          <ModalEditAddLucroComponent
            type="ADD"
            idUsuario={getToken() ?? ""}
            filters={filters}
          />
        </Box>

        {/* Filtros */}
        <FilterControls
          haveField={true}
          haveOrdem={true}
          filters={filters}
          onChange={setFilters}
          classesLancamentoOptions={classesLancamentoOptions.data}
          mostUsedClass={mostUsedClass}
          classCounts={classCounts}
        />

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
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ModalEditAddLucroComponent
                  data={item}
                  type="EDIT"
                  idUsuario={dataUser?.id}
                  filters={filters}
                />
                <IconButton
                  color="error"
                  onClick={() => {
                    lucrosService
                      .update(item.id, { estaDeletado: true })
                      .then(() => {
                        mutate(["lucros", filters]);
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
