"use client"
import { useParams } from "next/navigation";
import { mockForms } from "@/lib/mocks/forms";
import { FormViewPage } from "../_components/FormViewPage";

export default function FormEditView() {
	const {form} = useParams();

    if (!form) {
        return <div>Error: formId is undefined</div>;
    }
	const formIndex = mockForms.findIndex((data) => data.id == form);
	const thisForm = mockForms[formIndex];

	return (
		<FormViewPage formId={form as string} title={thisForm.title}>
			Viewing settings for {thisForm.title}
		</FormViewPage>
	);
}