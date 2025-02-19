import { useForm } from "react-hook-form";
import * as IronBriteAPI from "../../../services/api-service";
import { useAuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const { register, handleSubmit, formState, setError } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const errors = formState.errors;

  const handleRegister = async (user) => {
    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("avatar", user.avatar[0]);

    try {
      await IronBriteAPI.register(formData);
      const data = await IronBriteAPI.login(user);

      login(data);

      navigate("/");
    } catch (error) {
      const { data } = error.response;

      Object.keys(data.errors).forEach((inputName) =>
        setError(inputName, { message: data.errors[inputName] })
      );
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-user fa-fw"></i>
          </span>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="John Doe"
            {...register("name", { required: "Mandatory field" })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-user fa-fw"></i>
          </span>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="user@example.org"
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
            {...register("password", { required: "Mandatory field" })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-lock fa-fw"></i>
          </span>
          <input
            type="file"
            className={`form-control ${errors.avatar ? "is-invalid" : ""} `}
            {...register("avatar")}
          />
          {errors.avatar && (
            <div className="invalid-feedback">{errors.avatar.message}</div>
          )}
        </div>

        <div className="d-grid">
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
