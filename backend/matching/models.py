from django.db import models
from students.models import Student
from recruiters.models import Job

class Match(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='matches')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='matches')
    score = models.IntegerField(help_text="Match score 0 - 100")
    explanation = models.JSONField(help_text="Detailed explainable factors, why, gaps, recommendation")
    status = models.CharField(max_length=50, default='Recommended') # Recommended, Consider, Skill Gap
    is_shortlisted = models.BooleanField(default=False)

    class Meta:
        unique_together = ('student', 'job')

    def __str__(self):
        return f"{self.student.student_id} <-> {self.job.title}: {self.score}%"
