import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context'
import { toast } from 'react-toastify'

const SignUpPage = () => {

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    /* confirmPassword: '' */
  });
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const { signup, setCheckSession } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!form.userName || !form.email || !form.password /* || !form.confirmPassword */) throw new Error('All fields are required');

      /* if (form.password !== form.confirmPassword) throw new Error('Passwords do not match'); */
      setLoading(true);
      const {/*  confirmPassword, */ ...rest } = form;
      const res = await signup(rest);
      if (res.error) {
        setError(res.error);
      }
      setCheckSession((prev) => !prev);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    };

    const { userName, email, password/* , confirmPassword */ } = form;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-primary rounded-lg shadow-lg w-1/2 md:w-1/3 lg:w-1/3 p-3">
        <h1 className="text-primary-content text-center text-2xl font-bold p-4">Become a Library Friend!</h1>
        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
            <label htmlFor="userName" className="col-span-1 text-primary-content flex justify-end">Username</label>
            <input
            name='userName'
            value={userName}
            onChange={handleChange}
            type="username" id="username" className="col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
          </div>
          <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
            <label htmlFor="email" className="col-span-1 text-primary-content flex justify-end">Email</label>
            <input
            name = 'email'
            value={email}
            onChange={handleChange}
            type="email" id="email" className="col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
          </div>
          <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
            <label htmlFor="password" className="col-span-1 text-primary-content flex justify-end ">Password</label>
            <input
            name = 'password'
            value={password}
            onChange={handleChange}
            type="password" id="password" className="col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
          </div>
          <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
            {/* <label htmlFor="password" className="col-span-1 text-primary-content flex justify-end">repeat Password</label>
            <input
            name = 'confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            type="password" id="password" className="col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" /> */}
            <small className="text-primary-content">
              Already have an account?{' '}
              <Link to='/login' className='text-primary-content hover:underline'>
                Log in!
              </Link>
            </small>
          </div>
          <div className="flex justify-end mt-4">
            <button disabled={loading} type="submit" className="btn btn-accent">Register</button>
            {error && <p>{typeof error === 'object' ? error.message : error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage