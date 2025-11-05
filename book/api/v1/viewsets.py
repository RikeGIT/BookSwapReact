from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
# from book.models import Book # Import moved to get_queryset
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        from user.models import Book
        return Book.objects.select_related('owner').all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
