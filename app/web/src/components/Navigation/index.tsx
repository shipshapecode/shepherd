import { LogoLabel } from 'src/components/Logo/Logo';

import NavMenu from './NavMenu';

function Navigation() {
  return (
    <div className="shepherd-nav relative top-0 border-b border-navy bg-white px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
        <LogoLabel
          label={
            <span className="text-primary bg-pink-100 p-2 text-xs text-pink-400">
              Pro
            </span>
          }
        />
        <NavMenu />
      </div>
    </div>
  );
}

export default Navigation;
