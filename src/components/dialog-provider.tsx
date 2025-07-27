import { EditBranchDialog } from "@/pages/_app/cadastros/-features/branches/components/edit-branch-dialog";
import { NewBranchDialog } from "@/pages/_app/cadastros/-features/branches/components/new-branch-dialog";
import { useMountedState } from "react-use";

export function DialogProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewBranchDialog />
      <EditBranchDialog />
    </>
  );
}
