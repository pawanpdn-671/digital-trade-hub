"use client";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import ProductListing from "./ProductListing";
import React from "react";
import Image from "next/image";

interface ProductReelProps {
	title: string;
	subtitle?: string;
	href?: string;
	query: TQueryValidator;
}
const FALLBACK_LIMIT = 4;

const EmptyProducts = () => {
	return (
		<div>
			<div className="w-full flex justify-center">
				<Image
					src="/empty.svg"
					className="w-200 sm:w-[400px] h-auto"
					width={50}
					height={50}
					alt="empty product image"
				/>
			</div>
			<p className="text-center mt-10 text-xl font-medium text-muted-foreground">No Products Found!</p>
			<Link href="/products" className="mt-8 block text-center text-violet-600 text-lg font-semibold">
				Checkout other products &rarr;
			</Link>
		</div>
	);
};

const ProductReel = (props: ProductReelProps) => {
	const { title, subtitle, href, query } = props;

	const { data, isLoading } = trpc.getAllProducts.useInfiniteQuery(
		{
			limit: query.limit ?? FALLBACK_LIMIT,
			query,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextPage,
		},
	);

	const products = data?.pages.flatMap((page) => page.items);

	let map: (Product | null)[] = [];

	if (products && products.length) {
		map = products;
	} else if (isLoading) {
		map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
	}

	return (
		<section className="py-12">
			<div className="md:flex md:items-center md: justify-between mb-4">
				<div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
					{title ? <h1 className="text-2xl font-bold text-gray-900 sm:3xl">{title}</h1> : null}
					{subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
				</div>
				{href ? (
					<Link className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block" href={href}>
						Shop the collection <span aria-hidden="true">&rarr;</span>
					</Link>
				) : null}
			</div>
			<div className="relative">
				<div className="mt-6 flex items-center w-full">
					<div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
						{map?.map((product, index) => (
							<ProductListing key={index} product={product} index={index} />
						))}
					</div>
				</div>
			</div>
			{products?.length === 0 && <EmptyProducts />}
		</section>
	);
};

export default ProductReel;
