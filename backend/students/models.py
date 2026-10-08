from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    student_id = models.CharField(max_length=50, unique=True)
    branch = models.CharField(max_length=50)
    graduation_year = models.IntegerField(default=2026)
    cgpa = models.FloatField()
    backlog_count = models.IntegerField(default=0)
    readiness_score = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} ({self.student_id})"

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class StudentSkill(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='skills')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    proficiency = models.IntegerField(help_text="Proficiency score from 0 to 100")

    class Meta:
        unique_together = ('student', 'skill')

    def __str__(self):
        return f"{self.student.student_id} - {self.skill.name}: {self.proficiency}%"

class Project(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=255, help_text="Comma-separated skills/technologies")

    def __str__(self):
        return f"{self.title} ({self.student.student_id})"

class Assessment(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE, related_name='assessment')
    aptitude = models.IntegerField(default=75)
    technical = models.IntegerField(default=75)
    interview = models.IntegerField(default=70)
    communication = models.IntegerField(default=70)

    def __str__(self):
        return f"Assessment: {self.student.student_id}"
