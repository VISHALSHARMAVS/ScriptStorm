import { useSelector } from 'react-redux';

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-sm overflow-hidden rounded-full'>
          <img
            src={currentUser.profilePicture}
            alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
          />
        </div>
        <div className='flex flex-col'>
          <input
            type='text'
            id='username'
            placeholder='username'
            defaultValue={currentUser.username}
            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>
        <div className='flex flex-col'>
          <input
            type='email'
            id='email'
            placeholder='email'
            defaultValue={currentUser.email}
            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>
        <div className='flex flex-col'>
          <input
            type='password'
            id='password'
            placeholder='password'
            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>
        <button
  type='submit'
  className='bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md border-2 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600   '
>
  Update
</button>

      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
