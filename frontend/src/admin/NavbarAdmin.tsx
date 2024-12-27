import logo from "../assets/logo/nikeLogo.png";
import prof from "../assets/background/ava-1.jpg";

const NavbarAdmin = () => {
  return (
    <nav className='relative flex items-center py-2 bg-white max_padd_container ring-1 ring-slate-900/5'>
      <div className='flex-none px-3'>
        <img src={logo} alt="Logo" height={50} width={56}/>
      </div>
      <div className='flex-grow text-center'>
        <div className='px-3 tracking-widest uppercase bold-22 line-clamp-1 max-xs:bold-18 max-xs:py-2 max-xs:px-1'>
          Trang quản lý
        </div>
      </div>
      <div className='flex-none px-3'>
        <img src={prof} alt="Profile" className='w-12 h-12 rounded-full'/>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
