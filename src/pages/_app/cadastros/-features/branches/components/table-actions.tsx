"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenBranch } from "../store/use-open-branch";

type ActionsProps = {
  id: string;
};

export function Actions({ id }: ActionsProps) {
  const [ConfirmDialog, confirm] = useConfirm(
    "Você tem certeza?",
    "Você está prestes a excluir essa empresa.",
  );

  const onOpen = useOpenBranch((state) => state.onOpen);

  async function handleDelete() {
    const ok = await confirm();

    if (ok) {
      alert("TODO: Feature de deletar empresa");
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
            <Trash className="mr-2 size-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
