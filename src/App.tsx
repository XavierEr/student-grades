//#region Library imports
import React, { StrictMode } from 'react';
//#endregion

//#region React Component imports
import GradeTracker from './components/GradeTracker';
//#endregion

import styles from './styles/components/App.module.scss';

const App: React.FC = (): JSX.Element => {
  return (
    <StrictMode>
      <div className={styles.container}>
        <div className={styles.header}>Students</div>
        
        <GradeTracker className={styles.gradeTracker} />
      </div>
    </StrictMode>
  );
}

export default App;