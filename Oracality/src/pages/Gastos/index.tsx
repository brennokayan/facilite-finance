//index.ts gastos
import { Box, Container, IconButton, TableCell, TableRow } from "@mui/material";
import ComponenteNavBar from "../../components/navBar";
import { useUser } from "../../hooks/userHooks";
import gastosService from "../../service/gastosService";
import useSWR, { mutate } from "swr";
import { TableComponent } from "../../components/table/tableGastoComponent";
import { data } from "../../types/gastoType";
import {
  CalcFinalValue,
  getDefaultDates,
  ToBRL,
  ToISODate,
} from "../../utils/defaultFunctions";
import { ModalEditAddGastoComponent } from "./components/modalEditAdd/modalEditAddGastoComponent";
import { DefaultIcons } from "../../utils/defaultIcons";
import React from "react";
import { FilterControls } from "../../components/filterComponet";
import classeLancamentoService from "../../service/classeLancamentoService";

export function PaginaGastos() {
  document.title = "ORCALITY - Gastos";
  const dataUser = useUser()?.user;

  const { dataInicio: defaultDataInicio, dataFim: defaultDataFim } =
    getDefaultDates();

  const [filters, setFilters] = React.useState({
    ordem: "desc" as "asc" | "desc",
    field: "criadoEm" as "criadoEm" | "valor",
    dataInicio: defaultDataInicio,
    dataFim: defaultDataFim,
  });

  const {
    data: classesLancamentoOptions,
    error: errorClassesLancamento,
    isLoading: isLoadingClassesLancamento,
  } = useSWR("classesLancamento", async () => {
    const response = await classeLancamentoService.getSaida();
    return response.data;
  });

  const {
    data: gastos,
    error,
    isLoading,
  } = useSWR(["gastos", filters], async () => {
    const response = await gastosService.getAll(filters);
    return response.data;
  });

  // Calcule a classe mais usada com base nos dados de gastos
  const mostUsedClass = React.useMemo(() => {
    if (!gastos || !gastos.data || gastos.data.length === 0) return "";
    const frequency: Record<string, number> = {};
    gastos.data.forEach((item: data) => {
      const classId = item.idClasseLancamento;
      if (classId) {
        frequency[classId] = (frequency[classId] || 0) + 1;
      }
    });
    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    return sorted[0] ? sorted[0][0] : "";
  }, [gastos]);

  const classCounts = React.useMemo(() => {
    if (!gastos || !gastos.data) return {};
    return gastos.data.reduce((acc: Record<string, number>, item: data) => {
      const id = item.idClasseLancamento;
      if (id) {
        acc[id] = (acc[id] || 0) + 1;
      }
      return acc;
    }, {});
  }, [gastos]);

  if (isLoading || isLoadingClassesLancamento) {
    return <p>Carregando...</p>;
  }
  if (error || errorClassesLancamento) {
    return <p>Erro ao carregar</p>;
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
            <p>Gasto Total:</p>
            <h2>
              {ToBRL(
                CalcFinalValue(gastos?.data.map((item: data) => item.valor))
              )}
            </h2>
          </Box>
          <ModalEditAddGastoComponent
            type="ADD"
            idUsuario={dataUser?.id}
            filters={filters}
          />
        </Box>
        <FilterControls
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
            { title: "Esta pago", aling: "center" },
            { title: "Ações", aling: "center" },
          ]}
          Body={gastos?.data.map((item: data, index: number) => (
            <TableRow key={item.id || index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{item.titulo}</TableCell>
              <TableCell align="center">{ToBRL(item.valor)}</TableCell>
              <TableCell align="center">
                {item.ClasseLucro?.nome || "sem classe"}
              </TableCell>
              <TableCell align="center">{ToISODate(item?.criadoEm)}</TableCell>
              <TableCell align="center">
                {item.estaPago ? <p>Pago</p> : <p>Não pago</p>}
              </TableCell>
              <TableCell align="center" sx={{ display: "flex" }}>
                <ModalEditAddGastoComponent
                  data={item}
                  type="EDIT"
                  idUsuario={dataUser?.id}
                  filters={filters}
                />
                <IconButton
                  color="error"
                  onClick={() => {
                    gastosService
                      .update(item.id, { estaDeletado: true })
                      .then(() => {
                        mutate(["gastos", filters]);
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
