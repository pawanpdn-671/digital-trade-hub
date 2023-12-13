"use client";
import Link from "next/link";
import Cart from "./Cart";
import MaxWidthWrapper from "./MaxWidthWrapper";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";
import { User } from "../payload-types";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NavWrapper = ({ user }: { user: User | null }) => {
	const pathname = usePathname();
	const [userDetails, setUserDetails] = useState<User | null>(null);

	useEffect(() => {
		setUserDetails(user);
	}, [user, pathname]);

	return (
		<div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
			<header className="relative bg-white">
				<MaxWidthWrapper>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							<MobileNav user={userDetails} />

							<div className="ml-4 flex lg:ml-0">
								<Link href="/">
									<Image src="/logo.svg" width={30} height={30} alt="logo" className="w-10 h-10" />
								</Link>
							</div>
							<div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
								<NavItems />
							</div>

							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{userDetails ? null : (
										<Link
											href="/login"
											className={buttonVariants({
												variant: "ghost",
											})}>
											Sign in
										</Link>
									)}
									{userDetails ? null : <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>}
									{userDetails ? (
										<UserAccountNav user={userDetails} />
									) : (
										<Link
											href="/signup"
											className={buttonVariants({
												variant: "ghost",
											})}>
											Create account
										</Link>
									)}
									{userDetails ? <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span> : null}
									{userDetails ? null : (
										<div className="flex lg:ml-6">
											<span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>{" "}
										</div>
									)}
								</div>
								<div className="ml-4 flow-root lg:ml-6">
									<Cart />
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
};

export default NavWrapper;
