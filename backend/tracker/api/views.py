from rest_framework import viewsets
from ..models import UserEvent
from .serializers import UserEventSerializer

class UserEventViewSet(viewsets.ModelViewSet):
    queryset = UserEvent.objects.all()
    serializer_class = UserEventSerializer
