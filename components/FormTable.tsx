"use client"

import * as React from "react"
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon, MoreHorizontal, Settings2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table"
import Link from "next/link"

const data: Forms[] = [
	{
		id: "m5gr84i9",
		title: "Hostel Registration",
		createdAt: "2024-10-24T08:06:14+08:00",
		modifiedAt: "2024-10-29T09:24:09+08:00",
	},
	{
		id: "3u1reuv4",
		title: "Club Activity Application",
		createdAt: "2024-11-08T02:47:29+08:00",
		modifiedAt: "2024-11-08T02:47:29+08:00",
	},
	{
		id: "derv1ws0",
		title: "Student Vehicle Registration",
		createdAt: "2024-11-06T02:37:35+08:00",
		modifiedAt: "2024-10-28T04:20:15+08:00",
	},
];

export type Forms = {
	id: string;
	title: string;
	createdAt: string; // ISO 8601 formatted string
	modifiedAt: string; // ISO 8601 formatted string
};

export const columns: ColumnDef<Forms>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: "Title",
		enableSorting: true,
		cell: ({ row }) => (
			<Link href={`/${encodeURIComponent(row.original.id)}/`} className="sentencecase font-medium">
				{row.getValue("title")}
			</Link>
		),
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		enableSorting: true,
		cell: ({ row }) => {
			const timestamp = row.getValue("createdAt") as string;
			const date = new Date(timestamp);

			const formatted = new Intl.DateTimeFormat("en-US", {
				month: "2-digit",
				day: "2-digit",
				year: "numeric",
			}).format(date);

			return <div className="text-right">{formatted}</div>;
		},
	},
	{
		id: "actions",
		enableSorting: false,
		enableHiding: false,
		cell: ({ row }) => {
			const form = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(form.id)}
						>
							Copy form ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Open in new tab</DropdownMenuItem>
						<DropdownMenuItem>View response</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]

export function FormTable() {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter forms..."
					value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("title")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size={"sm"} className="ml-auto">
							<Settings2Icon /> View
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{
												header.column.getCanSort()
													?
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button variant="ghost">
																{header.isPlaceholder
																	? null
																	: flexRender(
																		header.column.columnDef.header,
																		header.getContext(),
																	)}
																{{
																	asc: <ArrowUpIcon />,
																	desc: <ArrowDownIcon />,
																}[header.column.getIsSorted() as string] ?? <ChevronsUpDownIcon />}
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent>
															<DropdownMenuItem onClick={() => header.column.toggleSorting(false)}><ArrowUpIcon /> Asc</DropdownMenuItem>
															<DropdownMenuItem onClick={() => header.column.toggleSorting(true)}><ArrowDownIcon /> Desc</DropdownMenuItem>
															<DropdownMenuSeparator />
															<DropdownMenuItem onClick={() => header.column.toggleVisibility(false)}><EyeOffIcon /> Hide</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
													:
													header.isPlaceholder
														? null
														: flexRender(
															header.column.columnDef.header,
															header.getContext())
											}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
