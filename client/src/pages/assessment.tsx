import Header from "@/components/header";
import Footer from "@/components/footer";
import AssessmentQuiz from "@/components/assessment-quiz";

export default function Assessment() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AssessmentQuiz />
      <Footer />
    </div>
  );
}
