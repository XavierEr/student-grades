//#region Library imports
import axios from 'axios';
//#endregion

//#region Type imports
import type { CancelToken } from 'axios';
//#endregion

export async function getGrades(cancelToken?: CancelToken): Promise<Array<Grade>> {
  const url = 'https://quanmgx57hjiqicdxgo2vzebqq0tghim.lambda-url.ap-southeast-1.on.aws/';

  const response = await axios.get<Array<Grade>>(url, { timeout: 3000, cancelToken });

  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.statusText);
}

export async function getGradesWithRetries(retries: number, cancelToken?: CancelToken): Promise<Array<Grade>> {
  try {
    const grades = await getGrades(cancelToken);

    return grades;
  } catch (error: any) {
    if (error.message !== 'component_unmount') {
      const retriesLeft = --retries;

      if (retriesLeft !== 0) {
        return getGradesWithRetries(retriesLeft, cancelToken);
      }
      throw error;
    }
    return [];
  }
}