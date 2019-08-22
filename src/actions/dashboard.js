import { database } from "../FireBase/firebase";
import { createActions } from "redux-actions";

const actions = {
  DASHBOARD: {
    START: v => v,
    SUCCESS: v => v,
    FAILURE: v => v
  }
};

const { dashboard } = createActions(actions);

export const getTasksThunk = () => {
  return dispatch => {
    dispatch(dashboard.start());
    const tasks = [];
    database
      .ref(`/customers`)
      .once("value", snap => {
        snap.forEach(data => {
          let task = data.val();
          task.id = data.key;
          tasks.push(task);
        });
      })
      .then(() => {
          dispatch(dashboard.success(tasks))
      })
      .catch(e => {
        dispatch(dashboard.failure(e));
      });
  };
}
