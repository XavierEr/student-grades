//#region Library imports
import React, { useMemo } from 'react';
//#endregion

import styles from '../styles/components/StudentGradeCard.module.scss';

const StudentGradeCard: React.FC<StudentGradeCardProps> = ({
  student
}): JSX.Element => {
  const courseIdsDisplay = useMemo<string>(() => {
    return student.courses.map(course => course.id).join(', ');
  }, [student]);

  const gpaDisplay = useMemo<string>(() => {
    const sumOfGpa = student.courses.reduce<number>((accumulator, currentValue) => {
      return accumulator += currentValue.grade;
    }, 0);

    return (sumOfGpa / student.courses.length).toFixed(1);
  }, [student]);

  return (
    <div className={styles.container}>
      <div className={styles.studentLabel}>student</div>

      <div className={styles.studentId}>{student.id}</div>

      <div className={styles.courseIds}>{courseIdsDisplay}</div>

      <div className={styles.gpaContainer}>
        <div className={styles.gpaLabel}>GPA</div>
        <div className={styles.gpa}>{gpaDisplay}</div>
      </div>
    </div>
  );
}

export default StudentGradeCard;