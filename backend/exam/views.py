from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Question
from .serializers import QuestionSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer



class SubmitAnswersView(APIView):
    def post(self, request):
        answers = request.data.get('answers', {}) 
        total = Question.objects.count()
        correct_count = 0

        for q_id, user_ans in answers.items():
            try:
                question = Question.objects.get(id=q_id)
                if question.correct_option == user_ans:
                    correct_count += 1
            except Question.DoesNotExist:
                pass

        percent = (correct_count / total * 100) if total > 0 else 0

        return Response({
            "total_questions": total,
            "correct_answers": correct_count,
            "percentage": round(percent, 2)
        }, status=status.HTTP_200_OK)
