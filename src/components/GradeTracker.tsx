//#region Library imports
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { type CancelToken, type CancelTokenSource } from 'axios';
//#endregion

//#region Helper imports
import { getGradesWithRetries } from '../apis/grade';

import { clsx } from '../helpers/clsx';
//#endregion

//#region React Component imports
import StudentGradeCard from './StudentGradeCard';
//#endregion

//#region SVG imports
import ErrorIcon from '../icons/error.svg';
import RetryIcon from '../icons/retry.svg';
//#endregion

import styles from '../styles/components/GradeTracker.module.scss';

const GradeTracker: React.FC<GradeTrackerProps> = ({
  className
}): JSX.Element => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
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

  const handleTryAgainClick = useCallback<() => Promise<void>>(async () => {
    try {
      setIsLoading(true);

      const grades = await getGradesWithRetries(3);

      setGrades(grades);
    } catch (error: any) {
      setHasError(true);
    }

    setIsLoading(false);
  }, []);

  // Retrieve grades
  useEffect(() => {
    const cancelTokenSource: CancelTokenSource = axios.CancelToken.source();

    const initGrades = async (cancelToken: CancelToken): Promise<void> => {
      try {
        setIsLoading(true);

        const grades = await getGradesWithRetries(3, cancelToken);

        setGrades(grades);
      } catch (error: any) {
        setHasError(true);
      }

      setIsLoading(false);
    }

    initGrades(cancelTokenSource.token);

    return () => {
      cancelTokenSource.cancel('component_unmount');
    }
  }, []);

  return (
    <div className={clsx(styles.container, className)}>
      {isLoading ? <div className={styles.loading}>Loading...</div> : null}

      {hasError ? <div className={styles.error}>
        <ErrorIcon />

        <div className={styles.message}>Error 401</div>

        <button
          type="button"
          onClick={handleTryAgainClick}>
          <RetryIcon />
          Try again
        </button>
      </div> : null}

      {students.map(student => <StudentGradeCard
        key={student.id}
        student={student} />)}
    </div>
  );
}

export default GradeTracker;