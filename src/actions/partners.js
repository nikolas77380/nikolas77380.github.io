import { database } from "../FireBase/firebase";
import { createActions } from "redux-actions";

const actions = {
  PARTNERS: {
    START: v => v,
    GETPARTNERSSUCCESS: v => v,
    GETPARTNERSFAILURE: v => v,
    CREATEPARTNERSUCCESS: v => v,
    CREATEPARTNERFAILURE: v => v
  }
};

const { partners } = createActions(actions);

export const getTasksThunk = () => {
  return dispatch => {
    dispatch(partners.start());
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
          dispatch(partners.getpartnerssuccess(tasks))
      })
      .catch(e => {
        dispatch(partners.getpartnersfailure(e));
      });
  };
}

export const createPartner = ({country, companyName, contactName, email, locations, notes}) => {
    return dispatch => {
        if (!country || !companyName || !contactName || !email || !locations || !country) {
            dispatch(partners.createpartnerfailure('empty fields'));

        } else
        database.ref('/partners').push({
            companyName,
            contactName,
            email,
            locations,
            notes
        })
        .then(() => {
            dispatch(partners.createpartnersuccess());
        })
        .catch(e => {
            dispatch(partners.createpartnerfailure(e))
        })
    }
  }