import NextLink from '@/elements/NextLink';

function NavLink({ href, icon: Icon, children }) {
  return (
    <NextLink
      href={href}
      activeClassName="bg-primary-900 text-opacity-100 !text-white">
      <a className="flex flex-col transition duration-200 items-center gap-2 p-2 text-center text-opacity-75 rounded-lg text-primary-100 focus:ring-2 ring-offset-2 hover:bg-primary-700 focus:outline-none ring-offset-primary-800 ring-primary-400">
        <Icon className="w-7 h-7" />
        <span className="text-sm">{children}</span>
      </a>
    </NextLink>
  );
}

export default NavLink;
