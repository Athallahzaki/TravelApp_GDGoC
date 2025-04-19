import NavbarMenu from '../../constants/NavbarMenu';
import { useAuth } from "@/contexts/authContext";
import { ModeToggle } from '../mode-toggle';

const Navbar = () => {
  const { userLoggedIn } = useAuth();

  return (
    <nav className='mx-auto flex h-[114px] w-[1170px] items-center'>
      <ul className='font-display justify-start'>
        <a href='/'>
          <li className='flex flex-row gap-1'>
            <h1 className='text-h3 text-primary-black font-bold'>Trabook</h1>
            <div className="bg-[url(/assets/logo-black.svg)] dark:bg-[url(/assets/logo-white.svg)] bg-center bg-no-repeat h-4 w-2.5"></div>
          </li>
        </a>
      </ul>
      <ul className='text-nav flex flex-1 items-center justify-end gap-4 font-sans'>
        {NavbarMenu.map((item, index) => (
          <a href={item.href} key={index}>
            <li className='text-primary-black'>{item.name}</li>
          </a>
        ))}
        {userLoggedIn ? (
          <a href='/dashboard'>
            <li className='text-primary-black'>Go To Dashboard</li>
          </a>
          ) : (
          <a href='/login'>
            <li className='text-primary-black'>Login</li>
          </a>
        )}
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
