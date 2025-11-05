from rest_framework import serializers
from user.models import Book
from user.api.v1.serializers import UserSerializer

class BookSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'owner']
