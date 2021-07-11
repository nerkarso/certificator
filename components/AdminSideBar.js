import NavLink from '@/elements/NavLink';
import {
  CogIcon,
  CubeTransparentIcon,
  LoginIcon,
  PhotographIcon,
} from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';

function AdminSideBar() {
  return (
    <aside className="relative z-10 flex flex-col flex-shrink-0 py-4 overflow-y-auto lg:h-full flex-grow-1 lg:w-28 bg-primary-800">
      <Link href="/admin">
        <a className="block w-12 mx-auto mt-2 mb-6">
          <Image src="/icon-192.png" width="48" height="48" alt="Logo" />
        </a>
      </Link>
      <nav className="grid grid-flow-col grid-cols-4 gap-2 px-2 mb-2 lg:grid-flow-row lg:grid-cols-1">
        <div className="lg:hidden">
          <NavLink href="/" icon={LoginIcon}>
            Exit
          </NavLink>
        </div>
        <NavLink href="/admin/presets" icon={CogIcon}>
          Presets
        </NavLink>
        <NavLink href="/admin/designs" icon={PhotographIcon}>
          Designs
        </NavLink>
        <NavLink href="/admin/api" icon={CubeTransparentIcon}>
          API
        </NavLink>
      </nav>
      <div className="hidden px-2 mt-auto lg:block">
        <NavLink href="/" icon={LoginIcon}>
          Exit
        </NavLink>
      </div>
    </aside>
  );
}

export default AdminSideBar;
