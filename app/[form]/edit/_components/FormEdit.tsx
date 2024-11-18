"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Question, Option, Form } from "@/lib/types";
import { ChevronDown, ChevronUp, CopyPlusIcon, LockIcon, PlusIcon, SquarePlusIcon, Trash2Icon, UnlockIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { GhostInput, GhostTextarea } from "../../_components/ghost-input";

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

	return (

		<div className="flex flex-col my-12 mx-4 gap-5">
			<Card>
				<CardHeader>
					{GhostTextarea({ value: "Hostel Registration" })}
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
							<div className="pb-1 flex gap-1"> {/* NOTE: Might extract this part to `CardToolbar` or any suitable name*/}
								<Button variant={"ghost"} size={"icon"} disabled={isFirstQuestion}><ChevronUp /></Button>
								<Button variant={"ghost"} size={"icon"} disabled={isLastQuestion}><ChevronDown /></Button>
								<Button variant={"ghost"} size={"icon"}>{locked ? <LockIcon /> : <UnlockIcon />}</Button>
								<Button variant={"ghost"} size={"icon"} disabled={locked}><Trash2Icon /></Button>
								<Button variant={"ghost"} size={"icon"}><CopyPlusIcon /></Button>
								<Button variant={"ghost"} size={"icon"}><SquarePlusIcon /></Button>
							</div>
							<Card
								className={`${focused ? "shadow-md border-black border-2" : "shadow-none"}`}
								onClick={() => setCardOnFocus(question.id)}
							>
								<CardHeader className="pb-1 flex flex-row items-baseline w-full gap-4">
									{GhostTextarea({ value: question.question })}
									<Select>
										<SelectTrigger className="w-[200px]">
											<SelectValue placeholder="Choose" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="short">Short Answer</SelectItem>
												<SelectItem value="paragraph">Paragraph Answer</SelectItem>
												<SelectSeparator />
												<SelectItem value="select">Dropdown</SelectItem>
												<SelectItem value="checkbox">Checkbox</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</CardHeader>
								<CardContent><div className="px-4 py-2">{getAnswers(question, focused)}</div></CardContent>
								<CardFooter>
									<div className="flex items-center gap-3">
										<Switch id={`${question.id}-required`} />
										<label htmlFor={`${question.id}-required`}> Required</label>
									</div>
								</CardFooter>
							</Card>
						</div>
					);
				})
			}
		</div>
	);
}