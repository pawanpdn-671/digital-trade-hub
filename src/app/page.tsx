"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, Leaf, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const perks = [
	{
		name: "Instant Delivery",
		Icon: ArrowDownToLine,
		description: "Get your assets delivered to your email in seconds and download them right away.",
	},
	{
		name: "Guaranteed Quality",
		Icon: CheckCircle,
		description:
			"Every assets on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
	},
	{
		name: "For the Planet",
		Icon: Leaf,
		description: "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
	},
];

export default function Home() {
	const [rotateIndex, setRotateIndex] = useState<number>(0);

	useEffect(() => {
		const animateTexts = document.querySelector(".animate_text_block")?.children as HTMLCollection;

		const animateText = () => {
			for (let i = 0; i < animateTexts.length; i++) {
				animateTexts[i].classList.remove("text_in", "text_out");
			}
			animateTexts[rotateIndex].classList.add("text_in");

			setTimeout(() => {
				animateTexts[rotateIndex].classList.add("text_out");
			}, 2800);

			setTimeout(() => {
				if (rotateIndex === animateTexts.length - 1) {
					setRotateIndex(0);
				} else {
					setRotateIndex(rotateIndex + 1);
				}
			}, 3100);
		};

		animateText();

		const intervalId = setInterval(() => {
			animateText();
		}, 3100);

		return () => clearInterval(intervalId);
	}, [rotateIndex]);

	return (
		<>
			<MaxWidthWrapper>
				<div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Your Hub for
						<span className="text-violet-600"> digital assets</span>, products that are
						<div className="flex flex-col justify-center">
							<p className="animate_text_block text-center ml-3">
								<span className="animate_text_item">high-quality</span>
								<span className="animate_text_item">secure</span>
								<span className="animate_text_item">affordable</span>
							</p>
						</div>
					</h1>
					<p className="mt-6 text-lg max-w-prose text-muted-foreground">
						Welcome to DigitalTradeHub. Every asset on our platform is verified by our team to ensure our highest
						quality standards.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 mt-6">
						<Link href="/products" className={buttonVariants()}>
							Browse Trending
						</Link>
						<Button variant="ghost">Our quality promise &rarr;</Button>
					</div>
				</div>

				<ProductReel query={{ sort: "desc", limit: 4 }} title="Brand new" href="/products" />
			</MaxWidthWrapper>
			<section className="border-t border-gray-200 bg-gray-50">
				<MaxWidthWrapper className="py-20">
					<div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
						{perks.map((perk) => (
							<div
								key={perk.name}
								className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
								<div className="md:flex-shrink-0 flex justify-center">
									<div className="h-16 w-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-900">
										{<perk.Icon className="w-1/3 h-1/3" />}
									</div>
								</div>
								<div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
									<h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
									<p className="mt-3 text-sm text-muted-foreground">{perk.description}</p>
								</div>
							</div>
						))}
					</div>
				</MaxWidthWrapper>
			</section>
		</>
	);
}
