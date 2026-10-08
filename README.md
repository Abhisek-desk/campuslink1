# CAMPUSLINK: AI-Powered Campus-to-Corporate Placement Management & Analytics Platform

CAMPUSLINK is a functional, prototype placement operations and decision-support platform designed to streamline the university-to-corporate hiring pipeline. It bridges academic performance, skill verification, recruiter requisition criteria, conflict-aware drive scheduling, offer tracking, and executive placement analytics into a unified workflow.

---

## 🔑 Demo Access Credentials

The prototype includes pre-configured single-click demo authentication:

| Role | Email | Password | Predefined Persona |
| :--- | :--- | :--- | :--- |
| **Placement Officer (Admin)** | `admin@campuslink.com` | `admin123` | Dr. Suresh Verma (Head of Placements) |
| **Student** | `student@campuslink.com` | `student123` | Aarav Sharma (B.Tech CSE, 2026 Batch) |

*You can also switch roles instantly using the role toggle in the top-right navbar.*

---

## 🚀 5-Minute Demonstration Flow (For Evaluators & Judges)

An interactive **"5-Min Demo Tour"** stepper is embedded directly at the top of the interface:

1. **Step 1: Placement Officer Login** — Enter as Admin to access the institutional operations dashboard.
2. **Step 2: Command Dashboard & At-Risk Model** — Inspect KPIs (500 Students, 372 Ready, 186 Offers, 154 Placed), hiring funnel trends, branch placement percentages, and the AI At-Risk Student predictive table.
3. **Step 3: Student Profile & AI Readiness Score** — Inspect Aarav Sharma's dynamic Employability Score (e.g. 78/100 or 84/100), the circular gauge, 7-point breakdown, positive factors, and improvement areas.
4. **Step 4: AI Recruiter Matching** — Run matching for **TechNova (Software Engineer)**. See candidate ranking (Aarav at 94%), and click **"View Match Explanation"** to inspect explainable scoring.
5. **Step 5: Simulated Placement Drives** — Review the 3 featured corporate drives: **TechNova (SDE)**, **DataSphere (Data Analyst)**, and **CloudWorks (Cloud Engineer)**.
6. **Step 6: Drive Scheduling & Conflict Detection** — Spot the deliberate conflict on **20 Oct**: Aarav Sharma double-booked for TechNova (10:00–12:00) and DataSphere (11:00–13:00). Click **"Apply Suggested Resolution"** to automatically reschedule DataSphere to 14:00–16:00 and clear the conflict live.
7. **Step 7: Offer Tracking Management** — View candidate offers across CTC packages and update candidate offer statuses (Accepted, Pending, Declined, Deferred).
8. **Step 8: Analytics Intelligence** — Review branch-wise placement percentages (CSE 82%, IT 78%, ECE 65%, EEE 54%) and corporate salary brackets.
9. **Step 9: Student Career Portal** — Switch to Student View to experience Aarav Sharma's personalized hub with recommendation matches, interview slots, notifications, and offer letters.

---

## 🛠 Technology Stack

### Frontend
- **React 19** + **Vite**
- **Tailwind CSS** (Anti-AI slop design discipline, high legibility, clean enterprise typography)
- **Recharts** (Interactive Area, Bar, and Line charts for funnel & department intelligence)
- **Lucide React** (Clean semantic iconography)

### Backend Architecture
- **RESTful API Engine**: Django REST Framework API contract implemented with live `/api/*` endpoints.
- **Django Codebase**: Clean architecture located in `/backend` with standard apps:
  - `accounts/` (User model and role definitions)
  - `students/` (Student profiles, skills, projects, assessments)
  - `recruiters/` (Corporate recruiters and job requisitions)
  - `drives/` (Drive models, venues, scheduling)
  - `matching/` (Explainable weighted scoring algorithms & `seed_demo_data` command)
  - `offers/` (Offer lifecycle and CTC tracking)
  - `notifications/` (In-app notifications)
  - `analytics/` (Institutional placement metrics)

### Database Configuration (MySQL)
The Django settings (`backend/config/settings.py`) are pre-configured to connect to MySQL:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('MYSQL_DATABASE', 'campuslink_db'),
        'USER': os.environ.get('MYSQL_USER', 'campuslink_user'),
        'PASSWORD': os.environ.get('MYSQL_PASSWORD', 'campuslink_password'),
        'HOST': os.environ.get('MYSQL_HOST', 'localhost'),
        'PORT': os.environ.get('MYSQL_PORT', '3306'),
    }
}
```

---

## 💻 Local Setup & Execution Instructions

### Running in Development Environment (Vite + Express Server)
```bash
# 1. Install dependencies
npm install

# 2. Start the full-stack server (serves API on /api and React client on port 3000)
npm run dev
```

### Running with Django & MySQL
```bash
# 1. Configure MySQL Database
mysql -u root -p -e "CREATE DATABASE campuslink_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Set environment variables
export MYSQL_DATABASE=campuslink_db
export MYSQL_USER=campuslink_user
export MYSQL_PASSWORD=campuslink_password
export MYSQL_HOST=localhost
export MYSQL_PORT=3306

# 3. Setup Django Python environment
cd backend
python -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers mysqlclient

# 4. Run migrations & seed demo data
python manage.py migrate
python manage.py seed_demo_data

# 5. Launch Django backend server
python manage.py runserver 0.0.0.0:8000
```

---

## 🧮 Explainable AI Matching Algorithm

The matching engine employs an explainable weighted formula:

$$\text{Match Score} = 0.20 \cdot \text{Eligibility} + 0.35 \cdot \text{Skill Match} + 0.15 \cdot \text{Projects} + 0.10 \cdot \text{Certs} + 0.10 \cdot \text{Assessment} + 0.10 \cdot \text{Readiness}$$

Every recommendation includes explicit rationale:
- **Positive factors**: CGPA thresholds, matching required skills, project verification.
- **Skill gaps**: Missing or sub-threshold technologies (e.g. Docker, AWS).
- **Prescriptive preparation roadmap**: Concrete 14-day study goals to close candidate gaps.
