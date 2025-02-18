import { Box, Button, Tooltip, Typography } from "@mui/material";
import { isLogged, login } from "../../utils/login";
import { SnackBarInfo } from "../../components/snackBarInfo/snackBarInfo";
import React from "react";
import { TextFieldPersonalizado } from "../../components/TextFieldPersonalizado";
import { DefaultIcons } from "../../utils/defaultIcons";
import imageLogin from "../../assets/logo 1.png";
import imageLoginEsquerda from "../../assets/imgLogin.jpg";
import { AuthenticateLogin } from "../../service/loginService";
import { Navigate } from "react-router-dom";

export function PaginaLogin() {
  type SnackBarType = "error" | "success" | "info";

  const [snackBar, setSnackBar] = React.useState<{
    open: boolean;
    message: string;
    type: SnackBarType;
  }>({
    open: false,
    message: "",
    type: "info",
  });
  const [loginData, setLoginData] = React.useState({ nome: "", senha: "" });

  const handleSnackBarClose = () => setSnackBar({ ...snackBar, open: false });
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AuthenticateLogin(loginData)
      .then((response) => {
        console.log(response.id);
        login(response.id, () => {
          setSnackBar({
            ...snackBar,
            message: "Login efetuado com sucesso!",
            type: "success",
            open: true,
          });
        });
      })
      .catch(() => {
        setSnackBar({
          ...snackBar,
          message: "Usuário ou senha incorreto! Tente novamente.",
          type: "error",
          open: true,
        });
      });
  };
  window.document.title = "ORCALITY - Login";

  React.useEffect(() => {
    if (isLogged()) {
      setSnackBar({
        message: "Você já está logado!",
        type: "info",
        open: true,
      });
    }
  }, []);
  if (isLogged()) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <SnackBarInfo
            message={snackBar.message}
            type={snackBar.type}
            toOpen={snackBar.open}
            handleClose={handleSnackBarClose}
          />
          <Navigate to="/dashboard" />
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            width: "100%",
            flexDirection: { xs: "column", sm: "column", md: "row-reverse" },
          }}
        >
          <Box
            width={"50%"}
            height={"100%"}
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              bgcolor: "white",
            }}
          >
            <img
              src={imageLoginEsquerda}
              alt="Imagem de Login"
              width={"100%"}
              height={"100%"}
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%" },
              height: "100%",
              // background: "linear-gradient(150deg, rgba(84,176,101,1) 35%, rgba(0,212,255,1) 100%)",
              background:
                "linear-gradient(150deg, rgba(84,176,101,1) 25%, rgba(0,0,0,.9) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: "90%", sm: "55%", md: "60%" },
                height: "80%",
                borderTop: "1px solid rgba(255, 255, 255, .5)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                bgcolor: "rgba(255, 255, 255, .178)",
                blur: 2,
                borderRadius: 2,
                boxShadow: "5px 5px 5px  rgba(0, 0, 0, 0.5)",
                animation: `fadeInLeft 0.6s`,
                "@keyframes fadeInLeft": {
                  from: { opacity: 0, transform: "scale(0.5)" },
                  to: { opacity: 1, transform: "scale(1)" },
                },
              }}
            >
              <form
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  padding: "0 16px",
                }}
                onSubmit={handleLogin}
              >
                <Box sx={{ width: { xs: "45%", sm: "35%", md: "30%" } }}>
                  <img src={imageLogin} width={"100%"} />
                </Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold" }} //color: "rgba(84, 176, 101, 1)"
                >
                  ORCALITY
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "center",
                      width: "80%",
                    }}
                  >
                    <Tooltip title="Usuário" arrow>
                      <DefaultIcons.User
                        size={32}
                        color="rgba(255,255,255, 1)"
                      />
                    </Tooltip>
                    <TextFieldPersonalizado
                      required
                      autoComplete="off"
                      onChange={(newValue) => {
                        setLoginData({
                          ...loginData,
                          nome: newValue.target.value,
                        });
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "center",
                      width: "80%",
                    }}
                  >
                    <Tooltip title="Senha" arrow>
                      <DefaultIcons.Password
                        size={32}
                        color="rgba(255,255,255, 1)"
                      />
                    </Tooltip>
                    <TextFieldPersonalizado
                      autoComplete="off"
                      onChange={(newValue) => {
                        setLoginData({
                          ...loginData,
                          senha: newValue.target.value,
                        });
                      }}
                      type="password"
                      required
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={snackBar.open}
                  >
                    Entrar
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => (window.location.href = "/welcome")}
                  >
                    O que é ORCALITY ?
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
        <SnackBarInfo
          message={snackBar.message}
          type={snackBar.type}
          toOpen={snackBar.open}
          handleClose={handleSnackBarClose}
        />
      </>
    );
  }
}
