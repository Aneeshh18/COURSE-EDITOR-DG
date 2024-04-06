import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import { Autocomplete } from "@mui/material";
interface Student {
  name: string;
}

interface Tag {
  tags: string[];
}

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

const CourseDetails: React.FC = () => {
  const { courseName, instructorName } = useParams<{
    courseId: string;
    courseName: string;
    instructorName: string;
  }>();
  const [students, setStudents] = useState<Student[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [courseDetail, updateCourseDetail] = useState({
    courseName: courseName,
    instructorName: instructorName,
    students: [],
    tags: [],
  });
  useEffect(() => {
    const fetchStudentsAndTags = async () => {
      try {
        const [studentsData, tagsData] = await Promise.all([
          fetchData<Student[]>(
            "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/students.json"
          ),
          fetchData<Tag>(
            "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/tags.json"
          ),
        ]);
        setStudents(studentsData.enrolledList);
        setTags(tagsData.tags);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentsAndTags();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Edited Response:", courseDetail);
  };

  if (students === undefined || tags === undefined) {
    return <CircularProgress />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width={"100%"}
    >
      <h1>Edit Course Details</h1>
      <form onSubmit={handleSubmit}>
        <Box marginBottom={2}>
          <TextField
            id="course"
            label="Course"
            variant="outlined"
            value={courseDetail.courseName}
            onChange={(e) =>
              updateCourseDetail({
                ...courseDetail,
                courseName: e.target.value,
              })
            }
            fullWidth
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            id="instructor"
            label="Instructor"
            variant="outlined"
            value={courseDetail.instructorName}
            onChange={(e) =>
              updateCourseDetail({
                ...courseDetail,
                instructorName: e.target.value,
              })
            }
            fullWidth
          />
        </Box>

        <Box marginBottom={2}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={tags}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Multiple values"
                placeholder="Tags"
              />
            )}
            onChange={(event, newValue) => {
              updateCourseDetail({
                ...courseDetail,
                tags: newValue,
              });
            }}
          />
        </Box>
        <Box marginBottom={2}>
          <Autocomplete
            multiple
            id="students-standard"
            options={students.map((student) => student.name)}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Students"
                placeholder="Tags"
              />
            )}
            onChange={(event, newValue) => {
              updateCourseDetail({
                ...courseDetail,
                students: newValue,
              });
            }}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary">
          UPDATE COURSE
        </Button>
      </form>
    </Box>
  );
};

export default CourseDetails;
