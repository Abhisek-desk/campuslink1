from django.db import models

class Recruiter(models.Model):
    company_name = models.CharField(max_length=150, unique=True)
    industry = models.CharField(max_length=150)
    contact_email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.company_name

class Job(models.Model):
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=150)
    description = models.TextField()
    minimum_cgpa = models.FloatField(default=7.0)
    required_skills = models.CharField(max_length=255, help_text="Comma-separated required skills")
    ctc = models.CharField(max_length=50, default="₹8.0 LPA")

    def __str__(self):
        return f"{self.recruiter.company_name} - {self.title}"
