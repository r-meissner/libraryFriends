
const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-primary rounded-lg shadow-lg w-1/2 md:w-1/3 lg:w-1/3 p-3">
        <h1 className="text-primary-content text-center text-2xl font-bold p-4">Become a Library Friend!</h1>
        <form className="p-4 space-y-4">
          <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
            <label htmlFor="username" className="col-span-1 text-primary-content flex justify-end">Username</label>
            <input type="username" id="username" className="col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
          </div>
          <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
            <label htmlFor="email" className="col-span-1 text-primary-content flex justify-end">Email</label>
            <input type="email" id="email" className="col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
          </div>
          <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
            <label htmlFor="password" className="col-span-1 text-primary-content flex justify-end ">Password</label>
            <input type="password" id="password" className="col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
          </div>
          <div className="grid grid-cols-5 space-y-1 gap-4 items-center">
            <label htmlFor="password" className="col-span-1 text-primary-content flex justify-end">repeat Password</label>
            <input type="password" id="password" className="col-span-4 input input-bordered border-primary-content bg-primary text-primary-content focus:bg-accent focus:text-accent-content" />
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="btn btn-accent">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage