const ProfileSettingsPage = () => {
  return (
    <div className="p-4">
      <h1>YOUR PROFILE</h1>

      {/* profile picture section */}
      <div className="flex flex-col pt-4">
        <div className="flex items-center">
          <p className="w-1/6">Profile Picture</p>
        </div>

        <div className="flex items-center">
          <div className="w-1/6 flex justify-start items-center">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
        <div className="flex items-center space-x-4">
            <div className="btn btn-sm btn-primary">Change Picture</div>
            <div className="btn btn-sm btn-warning">Delete Picture</div>
        </div>
      </div>


      {/* username section */}
        <div className="flex flex-col pt-4">
          <div className="flex items-center">
            <p className="w-1/6">Username</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
            <input type="text"
            className="input input-primary placeholder-primary"
            value="username"
            disabled/>
          <div className="btn btn-primary btn-sm">Change Username</div>
        </div>
      </div>


      {/*email section */}
      <div className="flex flex-col pt-4">
        <div className="flex items-center">
          <p className="w-1/6">Email</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input type="text"
          className="input input-primary placeholder-primary"
          value="user@mailadress.com"
          disabled/>
        <div className="btn btn-primary btn-sm">Change Email</div>
      </div>

      {/*location section */}
      <div className="flex flex-col pt-4">
        <div className="flex items-center">
          <p className="w-1/6">Location</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input type="text"
          className="input input-primary placeholder-primary"
          value="City"
          disabled/>
          <input type="text"
          className="input input-primary placeholder-primary"
          value="Country"
          disabled/>
        <div className="btn btn-primary btn-sm">Change City and/or Country</div>
      </div>

      {/* delete profile section */}
      <div className="flex flex-col pt-4">
          <div className="flex items-center">
            <p className="w-1/6">Deleting</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="btn btn-warning btn-sm">Delete Profile</div>
        </div>
      </div>

  )
}

export default ProfileSettingsPage