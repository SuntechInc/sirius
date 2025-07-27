import { NewCompanyDialog } from "@/pages/_app/cadastro/-components/new-company-dialog";
import { useMountedState } from "react-use";

export function DialogProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewCompanyDialog />
    </>
  );
}
