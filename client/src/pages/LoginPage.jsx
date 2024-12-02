import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context"
import { useNavigate, useLocation } from "react-router-dom"


const LoginPage = () => {

  const [{ email, password}, setForm] = useState({
    email: '',
    password: ''
  });

  const { signin , setCheckSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error('All fields are required');
      setLoading(true);
      console.log(email, password);
      const res = await signin({ email, password });
      if (res.error) {
        setError(res.error);
      }
      setCheckSession((prev) => !prev);
      console.log('location.state?.next', location.state?.next );
      navigate(location.state?.next || '/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-primary rounded-lg shadow-lg w-1/2 md:w-1/3 lg:w-1/3 p-3">
        <h1 className="text-primary-content text-center text-2xl font-bold p-4">Login</h1>
        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-5 space-y-1 gap-2 items-center">
            <label htmlFor="email" className="col-span-1 text-primary-content flex justify-end">Email</label>
            <input
            name='email'
            value={email}
            onChange={handleChange}
            type="email" id="email" className="col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
          </div>
          <div className="grid grid-cols-5 space-y-1 gap-2 items-center">
            <label htmlFor="password" className="col-span-1 text-primary-content flex justify-end">Password</label>
            <input
            name='password'
            value={password}
            onChange={handleChange}
            type="password" id="password" className="col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
          </div>
            <small className="text-primary-content">
              Don&apos;t have an account?{' '}
              <Link to='/signup' className='text-primary-content hover:underline'>
                Register!
              </Link>
            </small>
          <div className="flex justify-end mt-4">
            <button type="submit" className="btn btn-accent"disabled={loading}>Login</button>
            {<p>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage