# core/urls.py
from django.contrib import admin
from django.urls import path, include
# Importa as views do Simple JWT para obtenção e renovação de tokens.
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    # Rota do admin
    path('admin/', admin.site.urls),

    # Rota para a API v1 do app user
    path('api/v1/', include('user.api.v1.router')),
    
    # Rota para a API v1 do app book
    path('api/v1/', include('book.api.v1.router')),

    # Rota teste para autenticação do usuário
    path('api/v1/', include('user.urls')),

    # Rotas para obter/renovar tokens JWT (compatível com /api e /api/v1)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair_v1'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh_v1'),

    # Rotas de 'user' (users e trades) já estão incluídas em 'api/v1/' acima via user.api.v1.router
]
