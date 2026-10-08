from django.db import models
from students.models import Student

class Offer(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Accepted', 'Accepted'),
        ('Declined', 'Declined'),
        ('Deferred', 'Deferred'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='offers')
    company = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    ctc = models.CharField(max_length=50)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    joining_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Offer: {self.student.student_id} at {self.company} ({self.status})"
