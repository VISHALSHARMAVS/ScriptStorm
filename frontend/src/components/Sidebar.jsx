import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get('tab');
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  return (
    <div className="w-full md:w-56  min-h-screen">
      <div className="flex flex-col p-4">
        <Link to="/dashboard?tab=profile">
          <div
            className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer ${
              tab === 'profile' ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'
            }`}
          >
            <HiUser className="mr-3 text-2xl" />
            <span className={`text-lg ${tab === 'profile' ? 'font-semibold' : ''}`}>
              Profile
            </span>
          </div>
        </Link>
        <div
          className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white">
          <HiArrowSmRight className="mr-3 text-2xl" />
          <span className="text-lg">Sign Out</span>
        </div>      
      </div>
    </div>
  );
}

export default Sidebar;
