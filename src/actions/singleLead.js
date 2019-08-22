import { createActions } from "redux-actions";
import { database } from "../FireBase/firebase";
import {STEPS, FAILED_STEPS} from "../constants/Steps";
import Provider from './../providers/Provider.js';

const actions = {
  LEADS: {
    START: v => v,
    FAILURE: v => v,
    UPDATEAPPLICATION: v => v,
    SETFILES: v => v,
    UPDATELEAD: v => v,
    SETPARTNERS: v => v,
    SETSINGLELEAD: V => V,
    CLEARSINGLELEAD: V => V,
  }
};

const { leads } = createActions(actions);

export const fetchLeadApplications = (id) => {
    return new Promise((resolve) => {
        const applications = [];
        database
            .ref('applications')
            .orderByChild('customer_id')
            .equalTo(id)
            .on("value", snap => {
                snap.forEach(data => {
                    getCurrentEntity('applications', data.key).then(item => {
                        applications.push(item);
                    })

                });
                resolve(applications)
        })
    })
};

export const fetchPartnersByCountry = (country) => {
    return async (dispatch, getState) => {
        const partners = [];
        database
            .ref('partners')
            .orderByChild('country')
            .equalTo(country)
            .on("value", snap => {
                snap.forEach(data => {
                    let task = data.val();
                    task.id = data.key;
                    partners.push(task);
               });
               dispatch(leads.setpartners(partners))
            })
    }
}

export const getCurrentEntity = (entity, id) => {
    return new Promise((resolve) => {
    database
        .ref(entity)
        .child(id)
        .once("value")
        .then((snap) => {
            const currentEntity = {};
            snap.forEach(data => {
                let key = data.key;
                let task = data.val();
                currentEntity[key] = task;
            });
            currentEntity.id = id;
            resolve(currentEntity)
        })
    })
};
export const setSingleLead = (id) => {
    return async (dispatch, getState) => {
        const currentLead = await getCurrentEntity('customers',id);
        const apps = await fetchLeadApplications(id.substr(1));
        currentLead.applications = apps; //[{'country': 'Ukraine'}];
        setTimeout(() => {
            dispatch(leads.setsinglelead(currentLead));
        }, 1000)


    }
};

export const connectPartner = (partnerId, applicationId) => {
    return async (dispatch, getState) => {
        const {currentLead} = getState().leads;
        const newObject= {
            ...currentLead,
            applications: currentLead.applications.map(el =>
                el.id === applicationId ? {...el, partnerId} : el
            )
        };
        const updates = {};
        updates['/applications/' + applicationId] = newObject.applications.find(el => el.id === applicationId);
        dispatch(leads.start());
        database.ref().update(updates)
        .then(() => {
          dispatch(leads.updatelead(newObject));
        })
        .catch((e) => {
          dispatch(leads.failure(e));
        })
    }
};

export const setApplication = ({id}) => {
    return async (dispatch, getState) => {
        const {currentLead, files} = getState().leads;
        if (!files[id]) {
            let appFiles = await Provider.getFiles(currentLead.id, id);
            let newFiles = {...files, [id]: appFiles};
            dispatch(leads.setfiles(newFiles));
        }

        dispatch(leads.updateapplication({
            ...currentLead.applications.find(el => el.id === id)
        }));
    }
};


const updateFirebaseApplication = ({applicationId, stepDescription, stepId}) => {
    return async (dispatch, getState) => {
        const {currentLead} = getState().leads;
        const newObject= {
            ...currentLead,
            applications: currentLead.applications.map(el =>
                el.id === applicationId ? {...el, completed_step: stepId, step_description: stepDescription } : el
            )
        };
        const updates = {};
        updates['/applications/' + applicationId] = newObject.applications.find(el => el.id === applicationId);
        dispatch(leads.start());
        database.ref().update(updates)
            .then(() => {
                dispatch(leads.updateapplication(newObject.applications.find(el => el.id === applicationId)));
            })
            .catch((e) => {
                dispatch(leads.failure(e));
            })
    }
};

const completeConnectPartnerStep = ({partnerId,applicationId, stepDescription, stepId}) => {
    return async (dispatch, getState) => {
        const {currentLead} = getState().leads;
        const newObject= {
            ...currentLead,
            applications: currentLead.applications.map(el =>
                el.id === applicationId ? {...el, partnerId, completed_step: stepId, step_description: stepDescription} : el
            )
        };
        const updates = {};
        updates['/applications/' + applicationId] = newObject.applications.find(el => el.id === applicationId);
        dispatch(leads.start());
        database.ref().update(updates)
            .then(() => {
                dispatch(leads.updateapplication(newObject.applications.find(el => el.id === applicationId)));
                console.log('send email - {to partner with links to docs for current lead}')
            })
            .catch((e) => {
                dispatch(leads.failure(e));
            })
    }
};

const completeInterviewOfferedStep = ({applicationId, stepDescription, stepId}) => {
    return async (dispatch, getState) => {
        dispatch(updateFirebaseApplication({applicationId, stepDescription, stepId}));
    }
};

const completeInterviewPassedStep = ({applicationId, stepDescription, stepId}) => {
    return async (dispatch, getState) => {
        dispatch(updateFirebaseApplication({applicationId, stepDescription, stepId}));
        if (!FAILED_STEPS.includes(stepDescription)) {
            console.log('send email - Interview Success')
            console.log('send  email - jobs@mytefl.com or jobs2@mytefl.com')
        }
    }
}

const completeJobStep = ({applicationId, stepDescription, stepId}) => {
    return async (dispatch, getState) => {
        dispatch(updateFirebaseApplication({applicationId, stepDescription, stepId}));
        console.log('send email - Job Accepted or declined by Applicant {email to partner}')
    }
};
const completeContractStep = ({applicationId, stepDescription, stepId}) => {
    return async (dispatch, getState) => {
        dispatch(updateFirebaseApplication({applicationId, stepDescription, stepId}));
    }
};

const completeInCountryStep = ({applicationId, stepDescription, stepId}) => {
    return async (dispatch, getState) => {
        dispatch(updateFirebaseApplication({applicationId, stepDescription, stepId}));
        if (!FAILED_STEPS.includes(stepDescription)) {
            console.log('send email - Send email to Tyler')
        }
    }
};

export const completeStep = (props) => {
    return async (dispatch, getState) => {
        if (props.stepDescription === Object.keys(STEPS[0])[0]) {
            dispatch(completeConnectPartnerStep({...props, stepId: 0}));
        }
        if (Object.values(STEPS[1])[0].includes(props.stepDescription)) {
            dispatch(completeInterviewOfferedStep({...props, stepId: 1}));
        }
        if (Object.values(STEPS[2])[0].includes(props.stepDescription)) {
            dispatch(completeInterviewPassedStep({...props, stepId: 2}));
        }
        if (Object.values(STEPS[3])[0].includes(props.stepDescription)) {
            dispatch(completeJobStep({...props, stepId: 3}));
        }
        if (Object.values(STEPS[4])[0].includes(props.stepDescription)) {
            dispatch(completeContractStep({...props, stepId: 4}));
        }
        if (Object.values(STEPS[5])[0].includes(props.stepDescription)) {
            dispatch(completeInCountryStep({...props, stepId: 5}));
        }
        dispatch(setSingleLead(getState().leads.currentLead.id));
    }
};