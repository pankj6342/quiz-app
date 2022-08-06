import { useRouter } from "next/router";
import { CreateQuestionsPage } from "../../components/Test/CreateQuestionsPage";

const CreateQuestions = () => {
  const router = useRouter();
  const testId = String(router.query.testId);
  return !testId ? (
    <></>
  ) : (
    <div>
      <CreateQuestionsPage testId={testId} />
    </div>
  );
};

export default CreateQuestions;
