import { Box, IconButton } from "@mui/material";
import { ComponenteCartoesCarrossel } from "./cartoesCarrossel";
import { DadosCartoesCarrosel } from "./dadosCartoesCarrossel";
import React from "react";
import { DefaultIcons } from "../../../utils/defaultIcons";

export function ComponenteCarrossel() {
  const [index, setIndex] = React.useState(0);
  const dados = DadosCartoesCarrosel;

  function handleNext() {
    setIndex((prevIndex) =>
      prevIndex === DadosCartoesCarrosel.length - 1 ? 0 : prevIndex + 1
    );
  }

  function handlePrev() {
    setIndex((prevIndex) =>
      prevIndex === 0 ? DadosCartoesCarrosel.length - 1 : prevIndex - 1
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#f9f9f9",
        }}
      >
        <ComponenteCartoesCarrossel
          key={dados[index].id}
          titulo={dados[index].titulo}
          descricao={dados[index].descricao}
          imagem={dados[index].imagem}
          haveButton={dados[index].haveButton}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 4}}>
        <IconButton
          onClick={() => {
            handlePrev();
          }}
        >
          <DefaultIcons.VoltarCarrossel size={32} color="black" />
        </IconButton>

        <IconButton
          onClick={() => {
            handleNext();
          }}
        >
          <DefaultIcons.AvancarCarrossel size={32} color="black" />
        </IconButton>
      </Box>
    </>
  );
}
