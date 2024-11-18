import { FormTable } from "@/app/_components/FormTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
	return (
		<div className="flex flex-col my-12 mx-4">
			<section>
				<h1>Online Form Builder</h1>
				<p></p>
				<div className="py-4 flex gap-4">
					<Button>Create Blank Form</Button>
					<Button variant={"secondary"}>Browse templates</Button>
				</div>
			</section>

			<Separator />

			<FormTable />
		</div>
	);
}