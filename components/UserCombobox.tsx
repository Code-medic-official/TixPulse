import { ChevronsUpDown, UserCircle2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/db/actions/user.actions";
import { Skeleton } from "./ui/skeleton";
import { set } from "mongoose";

export default function UserCombobox({
	selectAction,
	exclude = [],
}: {
	selectAction: (value: iUser) => void;
	exclude: iUser[];
}) {
	const [users, setUsers] = useState<iUser[]>();
	const [searchableUsers, setSearchableUsers] = useState<iUser[]>();
	const [value, setValue] = useState<string>();

	useEffect(() => {
		const fetchUsers = async () => setUsers(await getUsers());

		setSearchableUsers(
			users?.filter(
				(user) =>
					!exclude.some(
						(excludedUser) => excludedUser.username === user.username
					)
			)
		);

		if (!users) fetchUsers();
	}, [`${users}`, `${exclude}`]);

	console.log(searchableUsers, exclude);

	const selectHandler = (value: string) => {
		setValue(value);
		if (searchableUsers)
			selectAction(searchableUsers.find((user) => user.username === value)!);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="secondary" role="combobox">
					Select User <ChevronsUpDown />{" "}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search by username..." className="h-9" />

					<CommandList>
						{users && <CommandEmpty>No users found</CommandEmpty>}
						<CommandGroup>
							{users && users.length > 0
								? searchableUsers?.map((user) => (
										<CommandItem
											key={user._id}
											value={user.username}
											onSelect={selectHandler}
										>
											<UserCircle2 />
											<span>{user.username}</span>
										</CommandItem>
								  ))
								: [...Array(5)].map((_, i) => (
										<Skeleton key={i} className="w-full h-9 mb-1" />
								  ))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
