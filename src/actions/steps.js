import { database } from "../FireBase/firebase";
import { createActions } from "redux-actions";

const actions = {
    STEPS: {
        START: v => v,
        GETSTEPSSSUCCESS: v => v,
        GETSTEPSFAILURE: v => v,
        CREATESTEPSUCCESS: v => v,
        CREATESTEPFAILURE: v => v
    }
};

const { steps } = createActions(actions);

export const getTasksThunk = () => {
    return dispatch => {
        dispatch(steps.start());
        const tasks = [];
        database
            .ref(`/partners`)
            .once("value", snap => {
                snap.forEach(data => {
                    let task = data.val();
                    task.id = data.key;
                    tasks.push(task);
                });
            })
            .then(() => {
                dispatch(steps.getstepssuccess(tasks))
            })
            .catch(e => {
                dispatch(steps.getstepsfailure(e));
            });
    };
}

export const createStep = ({stepName}) => {
    return dispatch => {
        database.ref('/steps').push({
            stepName
        })
            .then(() => {
                dispatch(steps.createstepsuccess())
            })
            .catch(e => {
                dispatch(steps.createstepfailure())
            })
    }
}

export const deleteStep = (stepId) => {

}