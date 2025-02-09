import Navbar from "@/components/navbar";
import SignUpForm from "@/components/sign-up-form";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full items-center justify-center h-[90vh]">
        <div className="max-w-sm w-full">
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
