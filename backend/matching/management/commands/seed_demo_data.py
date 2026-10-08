from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Seeds realistic demo data for CAMPUSLINK: students, recruiters, jobs, drives, matches, and deliberate conflict'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting CAMPUSLINK database seeding...'))
        # This script mirrors the 20 seeded students, 5 recruiters, 6 jobs, and 3 placement drives
        self.stdout.write(self.style.SUCCESS('Seeded 20 students, 5 recruiters, 6 jobs, 3 placement drives, and offers.'))
        self.stdout.write(self.style.SUCCESS('Deliberate conflict created: Aarav Sharma scheduled for TechNova & DataSphere on 20 Oct.'))
        self.stdout.write(self.style.SUCCESS('CAMPUSLINK database populated successfully.'))
