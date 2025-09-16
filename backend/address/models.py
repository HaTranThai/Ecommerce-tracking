from django.db import models
from user.models import User

# Create your models here.
class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses', null=True, blank=True)
    address_id = models.AutoField(primary_key=True)
    ward = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    is_default = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'address'
        verbose_name = 'Address'
        verbose_name_plural = 'Addresses'

    def __str__(self):
        return f"{self.ward}, {self.district}, {self.province}"