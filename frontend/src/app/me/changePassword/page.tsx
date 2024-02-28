import Loading from "@/app/loading";
import EditPasswordForm from "@/components/forms/editPasswordForm";
import { Suspense } from "react";

const ChangePassword = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <div className="max-w-[420px] w-full">
          <h1 className="text-3xl font-bold my-4">Edite sua Senha</h1>
          <EditPasswordForm />
        </div>
      </Suspense>
    </div>
  );
};

export default ChangePassword;
