import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface ComponenteCartoesCarrosselProps {
  titulo: string;
  descricao: string;
  imagem: string;
  haveButton: boolean;
}

export function ComponenteCartoesCarrossel({
  titulo,
  descricao,
  imagem,
  haveButton,
}: ComponenteCartoesCarrosselProps) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: { xs: 220, sm: 250, md: 250 },
        boxShadow: 3,
        bgcolor: "#f9f9f9",
        animation: `fadeInLeft 0.6s`,
        "@keyframes fadeInLeft": {
          from: { opacity: 0, transform: "scale(0.5)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
      }}
    >
      {imagem && (
        <CardMedia
          component="img"
          height="140"
          image={imagem}
          alt={titulo}
          sx={{
            objectFit: "contain",
            padding: "1rem",
            backgroundColor: "#f9f9f9",
          }}
        />
      )}
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color="inherit"
          sx={{
            fontSize: { xs: "1rem", md: "1.3rem" },
            fontWeight: "bold",
          }}
        >
          {titulo}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: ".6rem", md: "0.8rem" },
          }}
        >
          {descricao}
        </Typography>
        {haveButton == true ? (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              color="success"
              variant="outlined"
              onClick={() => (window.location.href = "/")}
            >
              Entrar
            </Button>
            {/* <Button
              variant="outlined"
              onClick={() => (window.location.href = "/create-account")}
            >
              Criar Conta
            </Button> */}
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
}
