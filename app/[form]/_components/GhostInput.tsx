import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAutoResizeTextArea from "@/lib/hooks/useAutoResizeTextArea";

const GhostInput = ({ value }: { value: string }) => {
	return (
		<Input
			className="hover:bg-accent hover:text-accent-foreground border-none shadow-none w-full" value={value}
			readOnly
		/>
	);
}

const GhostTextarea = ({ value }: { value: string }) => {
	return (
		<Textarea
			className="hover:bg-accent hover:text-accent-foreground border-none shadow-none overflow-hidden resize-none font-medium"
			value={value}
			rows={1}
			ref={useAutoResizeTextArea(value)}
			placeholder="Question"
			readOnly
		/>
	);
}

export { GhostInput, GhostTextarea }