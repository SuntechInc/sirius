"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { CircleOff, Edit, MoreHorizontal } from "lucide-react";
import { useOpenBranch } from "../store/use-open-branch";
import { useDisableBranch } from "../mutations/use-disable-branch";

type ActionsProps = {
  id: string;
};

export function Actions({ id }: ActionsProps) {
  const [ConfirmDialog, confirm] = useConfirm(
    "Você tem certeza?",
    "Você está prestes a desativar essa empresa.",
  );

  const disableBranchMutation = useDisableBranch();

  const onOpen = useOpenBranch((state) => state.onOpen);

  async function handleDelete() {
    const ok = await confirm();

    if (ok) {
      disableBranchMutation.mutate(id);
    }
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit className="mr-2 size-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem disabled={false} onClick={handleDelete}>
            <CircleOff className="mr-2 size-4" />
            Desativar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
