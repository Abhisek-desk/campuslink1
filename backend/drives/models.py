from django.db import models
from recruiters.models import Job

class Drive(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='drives')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    venue = models.CharField(max_length=150)
    candidates_count = models.IntegerField(default=20)

    def __str__(self):
        return f"Drive: {self.job.recruiter.company_name} - {self.date} {self.start_time}"
