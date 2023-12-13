"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/ac-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const isSeller = searchParams.get("as") === "seller";
	const origin = searchParams.get("origin");

	const continueAsSeller = () => {
		router.push("?as=seller");
	};

	const continueAsBuyer = () => {
		router.replace("/login", undefined);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	});

	const { mutate: login, isLoading } = trpc.auth.login.useMutation({
		onSuccess: () => {
			toast.success(`You have logged in successfully.`);
			router.refresh();

			if (origin) {
				router.push(`/${origin}`);
				return;
			}
			if (isSeller) {
				router.push("/sell");
				return;
			}
			router.push("/");
		},
		onError: (err) => {
			if (err.data?.code === "UNAUTHORIZED") {
				toast.error("Invalid email or password");
				return;
			}
			toast.error("Something went wrong, Please try again.");
		},
	});

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		login({ email, password });
	};

	return (
		<>
			<div className="px-5 sm:px-0 relative flex pt-20 flex-col items-center justify-center lg:px-0">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col items-center space-y-2 text-center">
						<Image src="/logo.svg" width={25} height={25} alt="logo" className="h-20 w-20" />
						<h1 className="text-2xl font-bold">Login to your {isSeller ? "seller" : ""} account</h1>
						<Link
							className={buttonVariants({
								variant: "link",
								className: "gap-1.5",
							})}
							href="/signup">
							Don&apos;t have an account?
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>

					<div className="grid gap-6">
						<pre className="">
							login_id - pawanpradhanpc671@gmail.com
							<pre>password - testing123</pre>
						</pre>

						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid gap-2">
								<div className="grid gap-1 py-2">
									<Label htmlFor="email">Email</Label>
									<Input
										{...register("email")}
										id="email"
										className={cn({
											"focus-visible:ring-red-500": errors.email,
										})}
										placeholder="you@example.com"
									/>
									{errors?.email && <p className="text-sm text-red-500">{errors?.email?.message}</p>}
								</div>
								<div className="grid gap-1 py-2">
									<Label htmlFor="password">Password</Label>
									<Input
										{...register("password")}
										id="password"
										type="password"
										className={cn({
											"focus-visible:ring-red-500": errors.password,
										})}
										placeholder="Password"
									/>
									{errors?.password && <p className="text-sm text-red-500">{errors?.password?.message}</p>}
								</div>
								<Button>Login</Button>
							</div>
						</form>

						<div className="relative">
							<div className="absolute inset-0 flex items-center" aria-hidden="true">
								<span className="w-full border-t"></span>
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">or</span>
							</div>
						</div>
						{isSeller ? (
							<Button variant="secondary" disabled={isLoading} onClick={continueAsBuyer}>
								Continue as customer
							</Button>
						) : (
							<Button variant="secondary" disabled={isLoading} onClick={continueAsSeller}>
								Continue as seller
							</Button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
