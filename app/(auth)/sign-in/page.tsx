"use client"
import AuthForm from "@/components/forms/AuthForm"
import { signInWithCredentials } from "@/lib/actions/auth.actions";
import { signInSchema } from "@/lib/validations";

const SignIn = () => {
  return (
    <AuthForm
      type="sign-in"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
};
export default SignIn;
