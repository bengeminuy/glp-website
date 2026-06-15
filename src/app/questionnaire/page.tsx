import { getSession } from "@/lib/rbac";
import { QuestionnaireFlow } from "./_components/questionnaire-flow";

export const dynamic = "force-dynamic";

export default async function QuestionnairePage() {
  const session = await getSession();
  return (
    <div className="py-4">
      <QuestionnaireFlow alreadyAuthed={!!session} />
    </div>
  );
}
