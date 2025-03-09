
import camera from '../../assets/camera.png'
import done from '../../assets/Done.png'

function Settings() {
  return (
    <div className='w-full bg-slate-300 flex items-center justify-center'>
            <div className='w-6/12 bg-white rounded-md my-2 pt-4 flex flex-col items-center mb-6'>
                <div className='relative'>
                    <div className='cursor-pointer'>
                    <img
                        className='h-28 rounded-full'
                        src={"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"}
                        alt="Admin Avatar"
                    />
                    </div>
                    <div className='absolute top-20 left-20 flex bg-blue-950 h-6 w-6 items-center justify-center rounded-full '>
                        <img src={camera} alt="" />
                    </div>
                </div>
                <div className='w-9/12'>
                    <h1 className='text-xl font-semibold mt-8'>Account Setting</h1>
                </div>
                <div className='flex w-9/12 my-4'>
                    <h1>Personal</h1>
                </div>
                <div className='w-9/12 mb-4'>
                    {/* <h1 className='text-sm font-medium pb-1'>Name</h1> */}
                    <div>
                    <label htmlFor="name">Name</label>
                    <input required type="text" name='name' placeholder='Enter name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
               </div>
                </div>
                <div className='w-9/12 mb-4'>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input required type="text" name='phone' placeholder='Enter mobile number' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
               </div>
                </div>
                <div className='w-9/12 mb-4'>
                <div>
                    <label htmlFor="name">Email</label>
                    <input required type="text" name='name' placeholder='Enter email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
               </div>
                </div>
                <div className='w-9/12 mb-2'>
                <div>
                    <label htmlFor="name">Password</label>
                    <input required type="text" name='name' placeholder='Enter password' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
               </div>
                </div>
                <div className='w-full my-4 flex justify-center items-center'>
                    <button className='w-9/12 bg-blue-950 rounded-md text-white text-sm h-10'>Save changes</button>
                </div>
            </div>
         </div>
  )
}

export default Settings