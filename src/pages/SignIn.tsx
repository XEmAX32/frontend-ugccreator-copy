
import AuthForm from "@/components/auth/AuthForm";
import PageContainer from "@/components/layout/PageContainer";

const SignIn = () => {
  return (
    <PageContainer className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <AuthForm mode="signin" />
      </div>
    </PageContainer>
  );
};

export default SignIn;
