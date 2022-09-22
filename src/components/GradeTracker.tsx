//#region Library imports
import React, { useEffect, useMemo, useState } from 'react';
import axios, { type CancelToken, type CancelTokenSource } from 'axios';
//#endregion

//#region Helper imports
import { getGrades } from '../apis/grade';

import { clsx } from '../helpers/clsx';
//#endregion

//#region React Component imports
import Student from './Student';
//#endregion

import styles from '../styles/components/GradeTracker.module.scss';

const GradeTracker: React.FC<GradeTrackerProps> = ({
  className
}): JSX.Element => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [grades, setGrades] = useState<Array<Grade>>([]);

  const students = useMemo<Array<Student>>(() => {
    return grades.reduce<Array<Student>>((accumulator, currentValue) => {
      const student = accumulator.find(student => student.id === currentValue.student_id);

      if (!!student) {
        if (student.courses.length < 12) {
          student.courses.push({
            grade: currentValue.course_grade,
            id: currentValue.course_id
          });
        }
      } else {
        accumulator.push({
          id: currentValue.student_id,
          courses: [
            {
              grade: currentValue.course_grade,
              id: currentValue.course_id
            }
          ]
        });
      }

      return accumulator;
    }, []);
  }, [grades]);

  // Retrieve grades
  useEffect(() => {
    const cancelTokenSource: CancelTokenSource = axios.CancelToken.source();

    const initGrades = async (cancelToken: CancelToken): Promise<void> => {
      try {
        setIsLoading(true);

        const grades = await getGrades(cancelToken);

        setGrades(grades);
      } catch (error: any) {
        console.log(error)
      }

      setIsLoading(false);
    }

    initGrades(cancelTokenSource.token);

    return () => {
      cancelTokenSource.cancel('Component unmount');
    }
  }, []);

  return (
    <div className={clsx(styles.container, className)}>
      {students.map(student => <Student student={student} />)}
    </div>
  );
}

export default GradeTracker;