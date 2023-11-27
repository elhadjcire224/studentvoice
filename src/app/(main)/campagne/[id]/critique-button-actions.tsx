"use client";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { unSignaledCritiques } from "@/db/queries/campagne.query";
import { deleteCritique, signalCritique } from "@/db/queries/critique.query";
import { Critique, Role } from "@prisma/client";
import { Flag, MoreHorizontal, PenLine, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CritiqueButtonActions({
	critique,
	campaignUserId,
}: {
	critique: unSignaledCritiques;
	campaignUserId: string;
}) {
	const session = useSession();
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<MoreHorizontal />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{(critique.userId == session.data?.user?.id
					|| session.data?.user.role == Role.ADMIN) && (
						<>
							<DropdownMenuItem
								className="bg-red-400"
								onClick={async () => {
									const result = await deleteCritique(
										critique.id
									);
									if (result.success) {
										router.refresh();
										toast.success(result.message);
										return;
									} else {
										toast.error(result.message);
									}
								}}
							>
								<Trash2 />
								Supprimer
							</DropdownMenuItem>
							<DropdownMenuSeparator />
						</>
					)}

				{session.data?.user.role == Role.TEACHER &&
					session.data.user.id == campaignUserId && (
						<DropdownMenuItem
							onClick={async () => {
								const result = await signalCritique(
									critique.id
								);
								if (result.success) {
									router.refresh();
									toast.success(result.message);
									return;
								} else {
									toast.error(result.message);
								}
							}}
						>
							<Flag />
							Signaler
						</DropdownMenuItem>
					)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
