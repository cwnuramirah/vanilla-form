"use client"
import Link from "next/link";
import { GhostInput } from "./ghost-input";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, EllipsisVerticalIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const FormViewPage = ({ children, formId, title }: { children: React.ReactNode, formId: string, title: string }) => {
	const path = usePathname();
	const route = useRouter();

	const getTabs = ({ label }: { label: string }) => {
		const tablink = `/${formId}/${label.toLowerCase()}`;
		const isActive = path == tablink ? 'text-foreground border-b-2 border-black': 'text-muted-foreground hover:text-primary';

		return (
			<Link
				href={tablink}
				className={`h-10 w-[20vw] flex justify-center items-center ${isActive} gap-3 font-medium`}
			>
				{label}
			</Link>
		);
	}

	return (
		<div className="w-full">
			<div className="py-3 px-4 flex flex-row items-center justify-between">
				<div className="flex flex-row gap-2">
					<Button variant={"ghost"} size={"icon"} onClick={() => route.replace('/')}>
						<ChevronLeftIcon />
					</Button>
					{GhostInput({ value: title })}
				</div>

				<div className="flex flex-row gap-3">
					<Button>
						Share
					</Button>
					<Button variant={"ghost"} size={"icon"}>
						<EllipsisVerticalIcon />
					</Button>
				</div>
			</div>
			<nav className="w-full flex flex-row items-center justify-center border-b shadow-sm">
				{getTabs({ label: "Edit" })}
				{getTabs({ label: "Responses" })}
				{getTabs({ label: "Settings" })}
			</nav>
			<main>
				{children}
			</main>
		</div>
	);
}