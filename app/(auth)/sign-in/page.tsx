"use client"
import AuthForm from "@/components/forms/AuthForm"
import { signInSchema } from "@/lib/validations";

const SignIn = () => {
  return <AuthForm type="sign-in"
  schema={signInSchema}
  defaultValues ={{
    email: '',
    password: ''
  }}
  onSubmit={(data)=>{}}/>
};
export default SignIn;
