import { Test } from "../../components/Test/TestPage";
import { useRouter } from "next/router";

const TestPage = () => {
  const router = useRouter();
  const testId = String(router.query.testId);
  return !testId ? (
    <></>
  ) : (
    <div>
      <Test testId={testId} />
    </div>
  );
};

export default TestPage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
