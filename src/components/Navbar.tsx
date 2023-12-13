import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import NavWrapper from "./NavWrapper";

const Navbar = async () => {
	const nextCookies = cookies();
	const { user } = await getServerSideUser(nextCookies);

	return <NavWrapper user={user} />;
};

export default Navbar;
