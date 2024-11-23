"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Question, Option, Form } from "@/lib/types";
import { ChevronDown, ChevronUp, CopyIcon, LockIcon, PlusIcon, Settings2Icon, SquarePlusIcon, Trash2Icon, UnlockIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { GhostInput, GhostTextarea } from "../../_components/GhostInput";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export const FormEdit = ({ form }: { form: Form }) => {
	const questions: Question[] = form.questions;
	const [focusedCard, setFocusedCard] = useState<string | null>(null);
	const [expandedCard, setExpandedCard] = useState<string[] | null>([]);

	const setCardOnFocus = (id: string) => {
		if (focusedCard !== id) {
			setFocusedCard(id);
		}
	}

	const expandCard = (id: string) => {
		if (expandedCard?.includes(id)) {
			setExpandedCard((prev) => prev?.filter((cardId) => cardId !== id) || []);
		} else {
			setExpandedCard((prev) => ((prev !== null) ? prev.concat(id) : [id]));
		}
	};

	const getAnswers = (question: Question, focused: boolean) => {
		switch (question.type) {
			case "short":
				return <Input placeholder="Your answer" disabled />
			case "paragraph":
				return <Textarea placeholder="Your answer" disabled />
			case "select":
				return <OptionList>
					{
						question.options.map((option: Option, index: number) => {
							return (
								<OptionListItem key={`${question.id}-${option.id}`}
									questionId={question.id}
									option={option}
									focused={focused}
									isSingle={question.options.length === 1}>
									<span className="w-6">{index + 1}.</span>
								</OptionListItem>
							)
						})

					}
				</OptionList>
			case "checkbox":
				return <OptionList>
					{
						question.options.map((option: Option) => {
							return (
								<OptionListItem
									key={`${question.id}-${option.id}`}
									questionId={question.id}
									option={option}
									focused={focused}
									isSingle={question.options.length === 1}
								>
									<Checkbox disabled id={`${question.id}-${option.id}`} />
								</OptionListItem>
							)
						})
					}
				</OptionList>
			default:
				break;
		}
	}

	const sortOptions = (question: Question) => {
		const type = question.type;
		const haveOptions = type == "checkbox" || type == "radio";

		if (haveOptions) {
			return (
				<div className="flex flex-col space-y-1">
					<Label htmlFor={`${question.id}-sort`}>Sort options</Label>
					<Select>
						<SelectTrigger className="w-[200px]" id={`${question.id}-sort`}>
							<SelectValue placeholder="Sort by" defaultValue={"none"} />
						</SelectTrigger>
						<SelectContent align="end">
							<SelectGroup>
								<SelectItem value="none">None</SelectItem>
								<SelectItem value="alphabetic">Shuffle</SelectItem>
								<SelectItem value="alphanumeric">Ascending</SelectItem>
								<SelectItem value="email">Descending</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			);
		}
	}

	const textValidation = (question: Question) => {
		const type = question.type;
		const shortAnswer = type == "short";

		if (shortAnswer) {
			return (
				<div className="flex flex-col space-y-1">
					<Label htmlFor={`${question.id}-validation`}>Input validation</Label>
					<Select>
						<SelectTrigger className="w-[200px]" id={`${question.id}-validation`}>
							<SelectValue placeholder="Validation" defaultValue={"none"} />
						</SelectTrigger>
						<SelectContent align="end">
							<SelectGroup>
								<SelectItem value="none">None</SelectItem>
								<SelectItem value="alphabetic">Alphabetic</SelectItem>
								<SelectItem value="alphanumeric">Alphanumeric</SelectItem>
								<SelectItem value="email">Email</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			);
		}
	}

	return (
		<div className="flex flex-col py-12 px-4 gap-4 lg:mx-[20vw]">
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
					const expanded = expandedCard?.includes(question.id);
					const locked = focusedCard === question.id; //TODO: Add lock function, disable editing question in context
					const isFirstQuestion = index === 0;
					const isLastQuestion = index === (questions.length - 1);

					return (
						<div key={question.id}
							onFocus={() => setCardOnFocus(question.id)}
							className={`flex flex-col justify-start relative transition-all duration-200 ease-in-out`}
						>
							<div className={`w-full transition-all duration-200 ease-in-out ${!focused ? "h-[40px]" : "h-[0px]"}`} />
							<CardToolbar
								focused={focused} question={question} isFirst={isFirstQuestion} isLast={isLastQuestion} locked={locked}
							/>
							<Card
								className={`${focused ? "shadow-md border-black border-2" : "shadow-none"}`}
								onClick={() => setCardOnFocus(question.id)}
							>
								<CardHeader className="pb-1 flex flex-row items-baseline w-full gap-4">
									<GhostTextarea value={question.question} />
								</CardHeader>
								<CardContent>
									<div className="px-3">
										{getAnswers(question, focused)}
									</div>
								</CardContent>
								<CardFooter className="flex flex-col w-full">
									<div className="w-full flex flex-row justify-between items-center gap-3 mx-2">
										<div className="flex items-center space-x-2">
											<Switch id={`${question.id}-required`} />
											<Label htmlFor={`${question.id}-required`}> Required</Label>
										</div>
										<div className="flex justify-end items-end">
											<div className=" w-10 h-10">
												<Button variant={"outline"} size={"icon"}
													onClick={() => expandCard(question.id)}
												>
													<Settings2Icon />
												</Button>
											</div>
											<span className="[&_svg]:size-3 h-4 w-4 flex items-center justify-center absolute rounded-xl bg-white border border-input">
												<ChevronDown className={`bg-white pt-[1px] duration-200 ease-out ${expanded ? 'rotate-180' : 'rotate-0'}`} />
											</span>
										</div>
									</div>
									<div className={`w-full duration-100 ${expanded ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
										{
											expanded ?
												<div className={`w-full mt-3 flex flex-col gap-5 `}>
													<Separator />
													<div>
														<Label htmlFor={`${question.id}-desc`}> Description</Label>
														<Input />
													</div>
													{sortOptions(question)}
													{textValidation(question)}
												</div>
												: null
										}
									</div>
									<div className={`w-full duration-200 delay-10 ease-in-out ${expanded ? 'h-3' : 'h-0'}`} />
								</CardFooter>
							</Card>
						</div>
					);
				})
			}

		</div>
	);
}

const OptionList = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-3">
			<div className="w-full">
				{children}
			</div>
			<div className="flex flex-row justify-center w-full gap-3 pl-6">
				<Button variant={"secondary"} className="w-full">
					<PlusIcon /> Add &quot;Others&quot;
				</Button>
				<Button variant={"secondary"} className="w-full">
					<PlusIcon /> Add option
				</Button>
			</div>
		</div>
	);
}

const OptionListItem = ({ children, questionId, option, focused, isSingle: isAlone }: { children: React.ReactNode, questionId: string, option: Option, focused: boolean, isSingle: boolean }) => {
	return (
		<div key={option.id} className="mb-1 flex items-center gap-3">
			{children}
			<label htmlFor={`${questionId}-${option.id}`} className="w-full">
				{GhostInput({ value: option.option })}
			</label>
			{
				focused && !isAlone ?
					<Button variant={"ghost"} size={"icon"} className="text-muted-foreground">
						<XIcon />
					</Button>
					: <span className="w-9" />
			}
		</div>
	);
}

const CardToolbar = (
	{ focused, question, isFirst: isFirstQuestion, isLast: isLastQuestion, locked }
		: { focused: boolean, question: Question, isFirst: boolean, isLast: boolean, locked: boolean }) => {
	return (
		<div className={`w-full transition-all duration-100 delay-50 ease-in-out ${focused ? "opacity-100" : "opacity-0"}`}>
			{focused ?
				<div
					className={`w-full flex flex-row justify-between pb-1 absolute`}
					aria-controls={`${question.id}-toolbar`}
					aria-selected={focused}
					id={`${question.id}-toolbar`}
				>
					<div className="flex gap-1">
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
				</div>
				: null}
			<div className={`w-full transition-all duration-200 ease-in-out ${focused ? "h-[40px]" : "h-[0px]"}`} />
		</div>
	);
}
