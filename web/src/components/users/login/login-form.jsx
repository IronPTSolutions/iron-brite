import { useForm } from "react-hook-form";
import * as IronBriteAPI from "../../../services/api-service";
import { useAuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    try {
      user = await IronBriteAPI.login(user);
      login(user);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        const { data } = error.response;
        Object.keys(data.errors).forEach((inputName) =>
          setError(inputName, { message: data.errors[inputName] })
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} data-testid="login-form">
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-user fa-fw"></i>
          </span>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="user@example.org"
            data-testid="email-input"
            {...register("email", { required: "Mandatory field" })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-lock fa-fw"></i>
          </span>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""} `}
            placeholder="****"
            data-testid="password-input"
            {...register("password", { required: "Mandatory field" })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
