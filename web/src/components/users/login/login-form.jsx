import { useForm } from 'react-hook-form';
import * as IronBriteAPI from '../../../services/api-service'; 

function LoginForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const handleLogin = async (user) => {
    try {
      user = await IronBriteAPI.login(user);
      console.log(user);
    } catch (error) {
      if (error.response?.status === 401) {
        const { data } = error.response;
        Object.keys(data.errors)
          .forEach((inputName) => setError(inputName, { message: data.errors[inputName] }));
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="input-group mb-1">
          <span className="input-group-text"><i className='fa fa-user fa-fw'></i></span>
          <input type="email" className={`form-control ${(errors.email) ? 'is-invalid' : ''}`} placeholder="user@example.org" {...register('email')} />
          {(errors.email) && (<div className="invalid-feedback">{errors.email.message}</div>)}
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text"><i className='fa fa-lock fa-fw'></i></span>
          <input type="password" className="form-control" placeholder="****" {...register('password')} />
        </div>
        <div className="d-grid">
          <button className='btn btn-primary' type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;