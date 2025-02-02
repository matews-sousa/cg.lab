import LoginForm from "@/components/login-form";
import Navbar from "@/components/navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full items-center justify-center h-[90vh]">
        <div className="max-w-sm w-full">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
