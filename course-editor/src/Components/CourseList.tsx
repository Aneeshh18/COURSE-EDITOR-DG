import React from "react";
import useApi from "../hooks/useApi";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { API_ENDPOINTS } from "../utils/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export interface Course {
  courseId: string;
  instructorName: string;
  courseName: string;
  tags: string[];
  students: { name: string }[];
}

const CourseList: React.FC = () => {
  const {
    data: courses,
    loading,
    error,
  } = useApi<{ courses: Course[] }>(API_ENDPOINTS.COURSES);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Courses</h1>
      <TableContainer component={Paper}>
        <Table aria-label="courses table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Course ID</StyledTableCell>
              <StyledTableCell>Instructor</StyledTableCell>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell>Tags</StyledTableCell>
              <StyledTableCell>Students</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {courses &&
              courses.courses.map((course) => (
                <StyledTableRow key={course.courseId}>
                  <TableCell>{course.courseId}</TableCell>
                  <TableCell>{course.instructorName}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.tags.join(", ")}</TableCell>
                  <TableCell>
                    <ul>
                      {course.students.map((student, index) => (
                        <li key={index}>{student.name}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={{
                        pathname: `/course/${course.courseId}/${course.courseName}/${course.instructorName}`,
                        state: { courseData: course },
                      }}
                    >
                      <Button variant="contained" color="primary">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CourseList;
