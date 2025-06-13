from django.db import models

# Create your models here.

class UserEvent(models.Model):
    user_id = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField()

    def __str__(self):
        return f"{self.user_id} - {self.event_type}"
