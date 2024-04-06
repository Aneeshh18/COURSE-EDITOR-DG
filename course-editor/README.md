# Course Management System README

## Overview

Welcome to the Course Management System! This application helps users manage courses, instructors, students, and associated details such as course name, instructor name, tags, and enrolled students. This README provides an overview of the functionality and components of the system.

## Functionality

### Course List

- Upon launching the application, users are presented with a list of available courses.
- Each course is displayed with its Course ID, Instructor, Course Name, Tags, and Students enrolled.
- Users can click on the "View Details" button to see more information about a specific course.

### Course Details

- When users click on the "View Details" button for a course, they are directed to a page where they can edit the course details.
- Users can edit the Course Name, Instructor Name, Tags, and the list of enrolled Students.
- Changes made to the course details can be submitted by clicking the "UPDATE COURSE" button.

## Components

### App Component

- The main component that wraps the entire application.
- Utilizes React Router to handle navigation between different pages.

### CourseList Component

- Displays a list of courses fetched from an external API.
- Each course is rendered in a table format with relevant details.
- Utilizes custom hook `useApi` to fetch course data.

### CourseDetails Component

- Displays detailed information about a selected course.
- Allows users to edit course details such as name, instructor, tags, and enrolled students.
- Utilizes Autocomplete components from Material-UI for tag and student selection.
- Makes use of custom hook `useApi` to fetch student and tag data.

### useApi Hook

- Custom hook for handling API requests.
- Abstracts away the fetching logic, providing a clean and reusable way to fetch data from APIs.
- Returns the fetched data, loading state, and error state.

## Technologies Used

- React: Frontend library for building user interfaces.
- React Router: Library for handling navigation within a React application.
- Material-UI: Component library for React applications, providing pre-built UI components.
- TypeScript: Superset of JavaScript that adds static type-checking.
- Fetch API: Interface for fetching resources across the network.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Run the application using `npm run dev`.
5. Access the application in your browser at `http://localhost:5173`.

## Conclusion

The Course Management System provides a user-friendly interface for managing courses and their associated details. Users can easily view course information, make edits, and update course details as needed. With its clean design and intuitive user experience, it serves as a valuable tool for course administrators and instructors.
