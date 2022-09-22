//#region Library imports
import React, { useCallback } from 'react';
//#endregion

import styles from '../styles/components/Student.module.scss';

const Student: React.FC<StudentProps> = ({
  student
}): JSX.Element => {
  const getCourseIdsDisplay = useCallback<(courses: Array<Course>) => string>((courses: Array<Course>) => {
    return courses.map(course => course.id).join(', ');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.studentLabel}>student</div>

      <div className={styles.studentId}>{student.id}</div>

      <div className={styles.courseIds}>{getCourseIdsDisplay(student.courses)}</div>
    </div>
  );
}

export default Student;