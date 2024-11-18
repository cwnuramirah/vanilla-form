"use client"
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

function FormView() {
	const router = useRouter();
	const path = usePathname();

	return (
		<div className="flex flex-col my-12 mx-4 gap-4">
			<h1>Viewing form</h1>
			<section className="flex gap-4">
				<Button onClick={() => router.push(`${path}/edit`)}>Edit</Button>
				<Button>Responses</Button>
				<Button>Preview</Button>
				<Button>Settings</Button>
			</section>
		</div>
	);
}

export default FormView;