# Stellr Learning Platform - User Manual

**Version 1.0 | August 2025**

---

## Table of Contents

1. [Deploying/Installing Our System](#1-deployinginstalling-our-system)
2. [System Features](#2-system-features)
3. [Main Scenario Walkthrough](#3-main-scenario-walkthrough)
4. [Additional Scenarios](#4-additional-scenarios)

---

## 1. Deploying/Installing Our System

To deploy/install the Stellr Learning Platform, the following steps will be followed. Here's a high-level overview of the process along with technical specifications that are needed for the platform.

1. **Web Server:**
   ◦ We will need a web server to host the learning platform. Choices we considered include Apache, Nginx, or Node.js with Express. We finally decided on using Nginx as a reverse proxy with Node.js backend. Our aim is to ensure the server supports modern web technologies and serves static files like HTML, CSS, JavaScript, and multimedia content efficiently.

2. **Domain Name:**
   ◦ We will also need a domain name. We made our client (Stellr Academy) aware at the beginning of the project hence they will be the one responsible for getting that for us. We have so far talked to them about it and they decided on using (www.stellracademy.com) as their domain name. We plan on buying the domain from www.hostinger.com. We will configure the domain's DNS settings to point to our web server's IP address when we finally get it.

3. **Platform Files:**
   ◦ We will then upload all the platform files, including React build files, static assets, video content, and PDF materials, to the server. We will organize them into appropriate directories with CDN integration for multimedia content delivery.

4. **Database Setup:**
   ◦ We will set up a PostgreSQL database for the platform to store user information, course details, progress tracking, certificates, and other relevant data. We will make sure we create the necessary tables and configure the database connection parameters in the platform's backend code.

5. **External Dependencies:**
   ◦ We will also verify to make sure all external dependencies, such as video streaming services, payment gateways (Paystack), email services, and certificate generation libraries, are accessible and correctly configured in our platform's code.

6. **Test:**
   ◦ We will conduct thorough testing of the platform on the server to ensure that all functionalities, including user registration, course enrollment, video playback, offline synchronization, quiz system, and certificate generation, are working as expected. We will also check for any errors or issues that may arise due to the deployment process.

7. **Security:**
   ◦ We will implement necessary security measures, such as JWT token validation, input sanitization, HTTPS enforcement, and protection against common web application vulnerabilities like SQL injection and Cross-Site Scripting (XSS).

8. **Performance Testing:**
   ◦ We will perform load testing to ensure that the web server can handle the expected amount of concurrent users (up to 500) without becoming unresponsive or slow, especially on 3G networks which are common in Africa.

9. **Monitoring and Maintenance:**
   ◦ We will set up monitoring tools to track the platform's performance, uptime, and user engagement metrics. We will leave the maintenance aspect to our client (Stellr Academy) as we will not be handling this project again after the semester ends. We will make sure our client knows all the vital information which will be needed by the next development team in order for the platform to be maintained.

---

## 2. System Features

### Authentication System
**Purpose**: Secure user access with multiple login options
**User Interaction**: 
- Register using email or phone number
- Login with credentials or OTP verification
- Password reset functionality
- Profile management and updates

### Course Catalog
**Purpose**: Browse and discover available courses
**User Interaction**:
- Filter courses by category, difficulty, and duration
- Search courses by title or keywords
- View course details including instructor information
- Preview course content before enrollment

### Offline Learning
**Purpose**: Continue learning without internet connection
**User Interaction**:
- Download course materials for offline access
- Watch videos and read content offline
- Progress automatically syncs when online
- Receive notifications when sync is complete

### Progress Tracking
**Purpose**: Monitor learning advancement and achievements
**User Interaction**:
- View completion percentage for each course
- Track time spent on lessons
- See milestone achievements
- Resume learning from last accessed point

### Assessment System
**Purpose**: Evaluate learning through quizzes and tests
**User Interaction**:
- Take interactive quizzes after lessons
- Receive immediate feedback on answers
- View detailed explanations for incorrect responses
- Track quiz scores and improvement over time

### Certificate Generation
**Purpose**: Provide credentials for completed courses
**User Interaction**:
- Automatically receive certificates upon course completion
- Download certificates as PDF files
- Share certificates on social media
- Verify certificate authenticity through unique URLs

### User Dashboard
**Purpose**: Centralized view of learning activity
**User Interaction**:
- View enrolled courses and progress
- Access recent lessons and bookmarks
- See upcoming deadlines and recommendations
- Manage account settings and preferences

### Mobile Optimization
**Purpose**: Seamless learning experience on mobile devices
**User Interaction**:
- Touch-friendly interface design
- Responsive layout adapting to screen size
- Swipe gestures for navigation
- Optimized video playback for mobile data

---

## 3. Main Scenario Walkthrough

### Primary Use Case: Complete Learning Journey

**Scenario**: A new student discovers, enrolls in, and completes their first course

#### Step 1: Account Registration
1. Navigate to the Stellr platform homepage
2. Click the "Register" button in the top navigation
3. Fill in the registration form:
   - Enter first name and last name
   - Provide email address or phone number
   - Create a secure password
4. Click "Create Account"
5. **Expected Output**: Registration success message and automatic login

#### Step 2: Course Discovery
1. From the homepage, click "Explore Courses"
2. Browse the course catalog displaying available courses
3. Use filters to narrow down options:
   - Select "Web Development" category
   - Choose "Beginner" difficulty level
4. Click on "Introduction to HTML & CSS" course card
5. **Expected Output**: Course detail page with description, instructor info, and curriculum

#### Step 3: Course Enrollment
1. On the course detail page, review the course information
2. Click "Enroll Now" button
3. Confirm enrollment in the popup dialog
4. **Expected Output**: Success message and redirect to course dashboard

#### Step 4: Learning Experience
1. Access the course from "My Courses" section
2. Click on "Lesson 1: HTML Basics"
3. Watch the video content (automatically pauses for note-taking)
4. Read the accompanying text materials
5. Click "Mark as Complete" when finished
6. **Expected Output**: Progress bar updates, next lesson becomes available

#### Step 5: Assessment
1. After completing all lessons, access the course quiz
2. Answer multiple-choice questions about HTML concepts
3. Submit the quiz for automatic grading
4. Review feedback and explanations for each question
5. **Expected Output**: Quiz score displayed with pass/fail status

#### Step 6: Certificate Generation
1. Upon achieving passing score (70% or higher), certificate is automatically generated
2. Navigate to "Certificates" section in user dashboard
3. Click "Download Certificate" for the completed course
4. **Expected Output**: PDF certificate downloads with student name, course title, and completion date

**Problem Resolution**: This walkthrough addresses the core problem of providing accessible, structured technology education to African youth by demonstrating how users can discover, engage with, and complete courses entirely on mobile devices with intermittent connectivity.

---

## 4. Additional Scenarios

### Scenario A: Offline Learning Recovery

**Context**: Student loses internet connection while studying

**Steps**:
1. Student is watching a video lesson when connection drops
2. Platform displays "Offline Mode" indicator in top bar
3. Student continues watching cached video content
4. Student completes lesson and marks as complete offline
5. When connection returns, sync icon appears in navigation
6. Platform automatically uploads progress to server
7. **Expected Output**: "Sync Complete" notification appears, progress reflects across all devices

**Error Handling**: If sync fails, retry button appears with manual sync option

### Scenario B: Administrative Course Management

**Context**: Instructor needs to upload new course content

**Steps**:
1. Instructor logs in with admin credentials
2. Navigate to "Course Management" in admin panel
3. Click "Create New Course" button
4. Fill in course details:
   - Course title and description
   - Category and difficulty level
   - Upload course thumbnail image
5. Add lesson content:
   - Upload video files (platform compresses for mobile optimization)
   - Add text content and downloadable resources
   - Create quiz questions with multiple choice answers
6. Set course as "Published" when ready
7. **Expected Output**: Course appears in public catalog within 5 minutes

**Alternative Flow**: If video upload fails due to size limits, platform provides compression recommendations and retry options

### Scenario C: Password Recovery Process

**Context**: User forgets password and needs account recovery

**Steps**:
1. User clicks "Forgot Password" on login page
2. Enter registered email address or phone number
3. Platform sends verification code via SMS or email
4. User enters 6-digit verification code
5. Create new password meeting security requirements
6. Confirm new password
7. **Expected Output**: Password updated successfully, automatic login to account

**Error Conditions**: 
- Invalid verification code: "Code expired or incorrect" message with resend option
- Weak password: Real-time validation with strength indicator
- Account not found: "No account found" message with registration link

---

## User Feedback Integration

Based on User Acceptance Testing (UAT) feedback, the following improvements were implemented:

- **Enhanced Mobile Navigation**: Simplified menu structure based on user confusion during testing
- **Improved Offline Indicators**: Added clear visual cues for offline status after users reported uncertainty
- **Faster Video Loading**: Implemented progressive loading based on user complaints about initial load times
- **Clearer Progress Tracking**: Enhanced progress visualization following user requests for better completion tracking

---

## Support & Contact

For technical support or questions about using the platform:
- **Email**: support@stellracademy.com
- **Phone**: +233 27 613 9802
- **Help Center**: Available within the platform under "Help & Support"

---

*This manual reflects the final state of Stellr Learning Platform v1.0 as of August 2025. For the most current information, please refer to the in-platform help documentation.*
