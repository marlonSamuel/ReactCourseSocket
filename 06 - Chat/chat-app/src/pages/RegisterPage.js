import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';

export const RegisterPage = () => {
	const {register} = useContext(AuthContext);

	const [form, setForm] = useState({
		nombre: '',
		email: '',
		password: ''
	});
	
	const onChange = ({target}) => {
		const { name, value } = target;
		setForm({
			...form,
			[name]:value
		});
	}

	const onSubmit =  async(ev) =>{
		ev.preventDefault();
		//TODO: llamar backend
		const {nombre, email, password} = form;
		const resp = await register(nombre, email, password);
		
		if(!resp.ok) {
			Swal.fire('Error', resp.msg,'error');
		}

	}

	const todoOk = () => {
		return (form.email.length > 0 && form.password.length > 0 && form.nombre.length > 0) ? true: false;
	}

  return (
    <form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
					<span className="login100-form-title mb-3">
						Chat - Registro
					</span>

					<div className="wrap-input100 validate-input mb-3">
						<input className="input100" type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} />
						<span className="focus-input100"></span>
					</div>

					
					<div className="wrap-input100 validate-input mb-3">
						<input className="input100" type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} />
						<span className="focus-input100"></span>
					</div>
					
					
					<div className="wrap-input100 validate-input mb-3">
						<input className="input100" type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />
						<span className="focus-input100"></span>
					</div>
					
					<div className="row mb-3">
						<div className="col text-right">
              <Link to="/auth/login">
                Ya tienes cuenta?
              </Link>
						</div>
					</div>

					<div className="container-login100-form-btn m-t-17">
						<button className="login100-form-btn" disabled={ !todoOk()}>
							Crear cuenta
						</button>
					</div>

				</form>
  )
}
