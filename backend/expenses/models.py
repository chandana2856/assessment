from django.db import models
import uuid

class Expense(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    # Critical for handling retries
    idempotency_key = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.category} - {self.amount}"