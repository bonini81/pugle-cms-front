import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";

import "../scss/Login.scss";
import Button from "../components/Boton";
import TextField from "../components/CoTextField";

const Login = () => {
  interface FormValues {
    username: string;
    password: string;
  }

  const schema = yup.object().shape({
    username: yup.string().required("Usuario es requerido."),
    password: yup
      .string()
      .min(4, "Minimo 4 caracteres.")
      .max(20)
      .required("Contraseña es requerida."),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const url = `https://dev.edge-dob.com/wp-json/jwt-auth/v1/token?username=${data.username}&password=${data.password}`;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios
      .post(url, { headers })
      .then((result) => result.data);
    if (response) {
      localStorage.setItem("token", response.token);
      window.location.href = "https://dev.edge-dob.com/";
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <section className="main-wrapper-login-box">
      <div className="login-box-styles">
        <h1>Login Pugle CMS</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue="Username"
            render={({ field }) => (
              <TextField
                data-testid="username"
                className="login-field-styles"
                label="Username"
                {...register("username")}
                {...field}
                ref={null}
                error={!!errors.username}
                helperText={errors.username ? errors.username?.message : ""}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue="Password"
            render={({ field }) => (
              <TextField
                data-testid="password"
                label="Password"
                className="login-field-styles"
                {...register("password")}
                {...field}
                ref={null}
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ""}
              />
            )}
          />
          <div className="login-button-styles">
            <Button
              variant="contained"
              data-testid="login"
              type="submit"
              value="Login"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
      <DevTool control={control} />
    </section>
  );
};

export default Login;
