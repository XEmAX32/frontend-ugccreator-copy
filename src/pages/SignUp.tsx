
import AuthForm from "@/components/auth/AuthForm";
import PageContainer from "@/components/layout/PageContainer";

const SignUp = () => {
  return (
    <PageContainer className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <AuthForm mode="signup" />
      </div>
    </PageContainer>
  );
};

export default SignUp;
