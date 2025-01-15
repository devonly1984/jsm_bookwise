"use client";
import AuthForm from "@/components/forms/AuthForm";
import { signUp } from "@/lib/actions/auth.actions";
import { signUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      type="sign-up"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};
export default SignUp;
