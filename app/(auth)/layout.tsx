import Image from "next/image";
import { ReactNode } from "react";

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-2">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">Book Wise</h1>
          </div>
          <div className="">{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="auth illustration"
          width={1000}
          height={1000}
          className="w-full object-cover"
        />
      </section>
    </main>
  );
};
export default Layout;
