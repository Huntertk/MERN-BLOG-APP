import {Sidebar} from 'flowbite-react';
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'

const DashSidebar = () => {
    const navigate = useNavigate()

    const location = useLocation();
    const [tab, setTab] = useState("")
    
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if(tabFromUrl){
        setTab(tabFromUrl)
      }
    },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                    <Sidebar.Item 
                    active={tab === 'profile'} 
                    icon={HiUser} label={"User"} 
                    labelColor="dark"
                    onClick={() => navigate("/dashboard?tab=profile")}
                    >
                        Profile
                    </Sidebar.Item>
                {/* <Link to="/dashboard?tab=profile">
                </Link> */}
                <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar