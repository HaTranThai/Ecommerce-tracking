from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserEventViewSet

router = DefaultRouter()
router.register(r'events', UserEventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
