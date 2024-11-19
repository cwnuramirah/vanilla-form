"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Question, Option, Form } from "@/lib/types";
import { ChevronDown, ChevronUp, CopyIcon, EllipsisVerticalIcon, LockIcon, PlusIcon, SquarePlusIcon, Trash2Icon, UnlockIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { GhostInput, GhostTextarea } from "../../_components/ghost-input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export const FormEdit = ({ form }: { form: Form }) => {
	const questions: Question[] = form.questions;
	const [focusedCard, setFocusedCard] = useState<string | null>(null)

	const setCardOnFocus = (id: string) => {
		if (focusedCard !== id) {
			setFocusedCard(id);
		}
	}

	const getAnswers = (question: Question, focused: boolean) => {
		switch (question.type) {
			case "short":
				return <Input disabled placeholder="Your answer" />
			case "paragraph":
				return <Textarea disabled placeholder="Your answer" />
			case "select":
				return <div className="flex flex-col gap-3">
					<div className="w-full">
						{
							question.options.map((option: Option, index: number) => {
								return <div key={option.id} className="mb-1 flex items-center gap-3">
									<span className="w-6">{index + 1}.</span>
									<label htmlFor={`${question.id}-${option.id}`} className="w-full">
										{GhostInput({ value: option.option })}
									</label>
									{
										focused && question.options.length != 1 ?
											<Button variant={"ghost"} size={"icon"} className="text-muted-foreground">
												<XIcon />
											</Button>
											: <span className="w-9" />
									}
								</div>
							})
						}
					</div>
					<Button variant={"secondary"}>
						<PlusIcon /> Add option
					</Button>
				</div>
			case "checkbox":
				return <div className="flex flex-col gap-3">
					<div className="w-full">
						{
							question.options.map((option: Option) => {
								return <div key={option.id} className="h-9 mb-1 flex items-center gap-3">
									<Checkbox disabled id={`${question.id}-${option.id}`} />
									<label htmlFor={`${question.id}-${option.id}`} className="w-full">
										{GhostInput({ value: option.option })}
									</label>
									{
										focused && question.options.length != 1 ?
											<Button variant={"ghost"} size={"icon"} className="text-muted-foreground">
												<XIcon />
											</Button>
											: <span className="w-9" />
									}
								</div>
							})
						}
					</div>
					<Button variant={"secondary"}>
						<PlusIcon /> Add option
					</Button>
				</div>
			default:
				break;
		}
	}

	const shuffleOptions = (question: Question) => {
		const type = question.type;
		const haveOptions = type == "checkbox" || type == "radio";

		if (haveOptions) {
			return (
				<DropdownMenuCheckboxItem
					key={`${question.id}-shuffle`}
					className="capitalize"
					checked={true}
				>
					Shuffle option order
				</DropdownMenuCheckboxItem>
			);
		}
	}

	return (
		<div className="flex flex-col py-12 px-4 gap-5 lg:mx-[20vw]">
			<Card
				className={`${focusedCard === form.id ? "shadow-md border-black border-2" : "shadow-none"}`}
				onClick={() => setCardOnFocus(form.id)}
			>
				<CardHeader>
					{GhostTextarea({ value: form.title })}
				</CardHeader>
			</Card>
			{
				questions.map((question: Question, index: number) => {
					const focused = focusedCard === question.id;
					const locked = focusedCard === question.id; //TODO: Add lock function, disable editing question in context
					const isFirstQuestion = index === 0;
					const isLastQuestion = index === (questions.length - 1);

					return (
						<div key={question.id} onFocus={() => setCardOnFocus(question.id)}>
							{focused ?
								<div className="flex flex-row justify-between"> {/* NOTE: Might extract this part into a component with any suitable name*/}
									<div className="pb-1 flex gap-1">
										<Button variant={"ghost"} size={"icon"} disabled={isFirstQuestion}><ChevronUp /></Button>
										<Button variant={"ghost"} size={"icon"} disabled={isLastQuestion}><ChevronDown /></Button>
										<Button variant={"ghost"} size={"icon"}>{locked ? <LockIcon /> : <UnlockIcon />}</Button>
										<Button variant={"ghost"} size={"icon"} disabled={locked}><Trash2Icon /></Button>
										<Button variant={"ghost"} size={"icon"}><CopyIcon /></Button>
										<Button variant={"ghost"} size={"icon"}><SquarePlusIcon /></Button>
									</div>
									<Select>
										<SelectTrigger className="w-[200px]">
											<SelectValue placeholder={question.type} />
										</SelectTrigger>
										<SelectContent align="end">
											<SelectGroup>
												<SelectItem value="short">Short Answer</SelectItem>
												<SelectItem value="paragraph">Paragraph Answer</SelectItem>
												<SelectSeparator />
												<SelectItem value="select">Dropdown</SelectItem>
												<SelectItem value="checkbox">Checkbox</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div> : null
							}
							<Card
								className={`${focused ? "shadow-md border-black border-2" : "shadow-none"}`}
								onClick={() => setCardOnFocus(question.id)}
							>
								<CardHeader className="pb-1 flex flex-row items-baseline w-full gap-4">
									{GhostTextarea({ value: question.question })}

								</CardHeader>
								<CardContent><div className="px-4">{getAnswers(question, focused)}</div></CardContent>
								<CardFooter className="flex flex-row justify-end gap-3 mx-2">
									<div className="flex items-center gap-3">
										<Switch id={`${question.id}-required`} />
										<label htmlFor={`${question.id}-required`}> Required</label>
									</div>
									<Separator orientation="vertical" className="h-9" />
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size={"icon"}>
												<EllipsisVerticalIcon />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuCheckboxItem
												key={`${question.id}-description`}
												checked={true}
											>
												Show description
											</DropdownMenuCheckboxItem>
											{shuffleOptions(question)}
										</DropdownMenuContent>
									</DropdownMenu>
								</CardFooter>
							</Card>
						</div>
					);
				})
			}
		</div>
	);
}