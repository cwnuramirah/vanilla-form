"use client"
import { FormEdit } from "./_components/FormEdit";
import { useParams } from "next/navigation";
import { mockForms } from "@/lib/mocks/forms";
import { FormViewPage } from "../_components/FormViewPage";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Redo2Icon, Undo2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function FormEditView() {
	const { form } = useParams();

	if (!form) {
		return <div>Error: formId is undefined</div>;
	}
	const formIndex = mockForms.findIndex((data) => data.id == form);
	const thisForm = mockForms[formIndex];

	return (
		<FormViewPage formId={form as string} title={thisForm.title}>
			<div className="w-full px-4 py-2 lg:px-[20vw] flex flex-row items-center justify-between border-b shadow-sm bg-white sticky top-0" style={{ zIndex: 50 }}>
				<div className="flex flex-row items-center gap-[2px]">
					<Button variant={"secondary"} className="rounded-r-none px-3">Add</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={"secondary"} className="rounded-l-none px-2"><ChevronDownIcon /></Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							<DropdownMenuItem>Short Answer</DropdownMenuItem>
							<DropdownMenuItem>Paragraph Answer</DropdownMenuItem>

							<DropdownMenuItem>Dropdown</DropdownMenuItem>
							<DropdownMenuItem>Checkbox</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div>
					<Button variant={"ghost"} size={"icon"}><Undo2Icon /></Button>
					<Button variant={"ghost"} size={"icon"}><Redo2Icon /></Button>
					<Button>Save</Button>
				</div>
			</div>
			<FormEdit form={thisForm} />
		</FormViewPage>
	);
}