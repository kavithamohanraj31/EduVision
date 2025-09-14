import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: Array<{ text: string; weight: number; stream?: string }>;
  stream?: string;
}

interface AssessmentQuizProps {
  questions: AssessmentQuestion[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  onAnswerSelect: (answer: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
  showNavigation?: boolean;
}

export default function AssessmentQuiz({
  questions,
  currentQuestionIndex,
  answers,
  onAnswerSelect,
  onPrevious,
  onNext,
  isSubmitting = false,
  showNavigation = true,
}: AssessmentQuizProps) {
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswer = answers[currentQuestion?.id];

  if (!currentQuestion) {
    return (
      <Card data-testid="no-question-card">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No question available</p>
        </CardContent>
      </Card>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'aptitude':
        return <Brain className="h-5 w-5 text-primary" />;
      case 'interest':
        return <Brain className="h-5 w-5 text-secondary" />;
      case 'personality':
        return <Brain className="h-5 w-5 text-accent" />;
      default:
        return <Brain className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'aptitude':
        return 'Aptitude Assessment';
      case 'interest':
        return 'Interest Assessment';
      case 'personality':
        return 'Personality Assessment';
      default:
        return 'Assessment';
    }
  };

  return (
    <div className="space-y-6" data-testid="assessment-quiz">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" data-testid="question-counter">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Badge>
          <Badge variant="secondary">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        <Progress value={progress} className="h-2" data-testid="quiz-progress" />
      </div>

      {/* Question Card */}
      <Card data-testid="question-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getCategoryIcon(currentQuestion.category)}
            {getCategoryTitle(currentQuestion.category)}
          </CardTitle>
          {currentQuestion.stream && (
            <Badge variant="secondary" className="w-fit">
              {currentQuestion.stream}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-6 leading-relaxed" data-testid="question-text">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left border border-border rounded-lg hover:bg-muted/50 transition-all duration-200 ${
                  answers[currentQuestion.id] === option.text 
                    ? 'bg-primary/10 border-primary shadow-sm' 
                    : 'hover:border-muted-foreground hover:shadow-sm'
                }`}
                onClick={() => onAnswerSelect(option.text)}
                disabled={isSubmitting}
                data-testid={`option-${index}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion.id] === option.text
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {answers[currentQuestion.id] === option.text && (
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  <span className="flex-1 text-sm sm:text-base">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          {showNavigation && (
            <div className="flex justify-between items-center mt-8">
              <Button 
                variant="outline" 
                onClick={onPrevious}
                disabled={isFirstQuestion || isSubmitting}
                className="flex items-center gap-2"
                data-testid="previous-button"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-4">
                {isSubmitting && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                )}
                
                <Button 
                  onClick={onNext}
                  disabled={!hasAnswer || isSubmitting}
                  className="flex items-center gap-2"
                  data-testid="next-button"
                >
                  {isLastQuestion ? 'Complete' : 'Next'}
                  {!isLastQuestion && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Question Hints */}
      <Card className="bg-muted/30" data-testid="hints-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-bold text-sm">💡</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Assessment Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Choose the option that best represents your genuine preferences</li>
                <li>• Consider what naturally interests or excites you</li>
                <li>• There are no right or wrong answers - be honest</li>
                {currentQuestion.category === 'aptitude' && (
                  <li>• Think about subjects where you feel most confident</li>
                )}
                {currentQuestion.category === 'interest' && (
                  <li>• Focus on activities you enjoy or would like to explore</li>
                )}
                {currentQuestion.category === 'personality' && (
                  <li>• Select based on how you typically behave or react</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
