import { useRouter } from "next/router";

export const ReviewModal = ({ setReviewModal }) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 backdrop-blur-md flex flex-col space-y-2 items-center justify-center">
      <div className="w-[60%] h-[60%] shadow-md p-5 flex flex-col justify-center items-center">
        <div className="text-4xl text-center text-green-500">Success!</div>
        <div className="text-xl text-center">
          Your Test has been created successfully!
        </div>
        <div className="w-full flex items-center justify-evenly space-x-1 mt-2">
          <button
            onClick={() => setReviewModal(false)}
            className="bg-white px-3 py-2 rounded-2xl"
          >
            Close
          </button>
          <button
            onClick={() => {
              router.push(`/start/`);
            }}
            className="bg-green-400 px-3 py-2 rounded-2xl"
          >
            Go to Tests Page
          </button>
        </div>
      </div>
    </div>
  );
};
