import Image from "next/image";
import Link from "next/link";

import vibeNetLogo from "@/assets/vibenet-logo.png";

import UserButton from "@/components/UserButton";
import SearchField from "@/components/SearchField";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="/">
          <Image src={vibeNetLogo} alt="logo" width={28} height={28} />
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
};
export default Navbar;
