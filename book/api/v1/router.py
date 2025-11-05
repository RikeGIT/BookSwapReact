from rest_framework.routers import DefaultRouter
from .viewsets import BookViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')

urlpatterns = router.urls
