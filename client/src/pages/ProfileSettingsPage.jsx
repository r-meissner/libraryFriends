import { getUserById, updateUser} from '../data/users'
import { useEffect, useState } from 'react'
import { useAuth } from '../context'


const ProfileSettingsPage = () => {

  const [user, setUser] = useState(null)
  const { user: activeUser } = useAuth()
  const activeUserId = activeUser._id

  const [username, setUsername] = useState('')
  const [enableUsernameField, setEnableUsernameField] = useState(false)
  const [email, setEmail] = useState('')
  const [enableEmailField, setEnableEmailField] = useState(false)
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [enableCityCountryFields, setEnableCityCountryFields] = useState(false)
  const [profilePicture, setProfilePicture] = useState('')
  const [enableProfilePictureField, setEnableProfilePictureField] = useState(false)

  useEffect(() => {
    const fetchUser = async (activeUserId) => {
      const fetchedUser = await getUserById(activeUserId)
      setUser(fetchedUser)
      console.log(user);

      setUsername(fetchedUser.userName);
      setEmail(fetchedUser.email);
      setCity(fetchedUser.city);
      setCountry(fetchedUser.country);
      setProfilePicture(fetchedUser.profilePicture);

    }
    fetchUser(activeUserId)
  }, [activeUserId])
  console.log(user);


  const saveChanges = async () => {
    const updatedUser = {
      userName: username,
      email: email,
      city: city,
      country: country,
      profilePicture: profilePicture,
    };
    await updateUser(activeUserId, updatedUser);
    setUser(updatedUser);
    setEnableUsernameField(false);
    setEnableEmailField(false);
    setEnableCityCountryFields(false);
    setEnableProfilePictureField(false);
  };

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
            value={username}
            disabled={!enableUsernameField}
            onChange={(e) => setUsername(e.target.value)}/>
          <div className="btn btn-primary btn-sm"
          onClick={() => setEnableUsernameField(true)}>Change Username</div>
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
          value={email}
          disabled={!enableEmailField}
          onChange={(e) => setEmail(e.target.value)}/>
        <div className="btn btn-primary btn-sm"
        onClick={() => setEnableEmailField(true)}>Change Email</div>
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
          value={city}
          disabled={!enableCityCountryFields}
          onChange={(e)=> setCity(e.target.value)}/>
          <input type="text"
          className="input input-primary placeholder-primary"
          value={country}
          disabled={!enableCityCountryFields}
          onChange={(e)=> setCountry(e.target.value)}/>
        <div className="btn btn-primary btn-sm"
        onClick={() => setEnableCityCountryFields(true)}>Change City and/or Country</div>
      </div>

      {/* save changes section */}
      <div className="flex flex-col pt-4">
          <div className="flex items-center">
            <p className="w-1/6">Saving</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="btn btn-success btn-sm" onClick={saveChanges}>Save Changes</div>
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