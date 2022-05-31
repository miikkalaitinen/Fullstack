import axios from 'axios';
import {
  Patient,
  EntryProp,
  DiagnosisProp,
  NewEntry,
  HealthCheckRating,
} from '../types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { modifyPatient, useStateValue } from '../state';
import AddEntryModal from '../AddEntryModal';
import Button from '@material-ui/core/Button';
import WorkIcon from '@material-ui/icons/Work';
import MedicalIcon from '@material-ui/icons/LocalHospital';
import Check from '@material-ui/icons/CheckBox';
import HealthRatingBar from '../components/HealthRatingBar';

const divStyle = {
  border: 'solid',
  borderRadius: '15px 10px',
  padding: '10px',
  marginTop: '10px',
};

const SingleDiagnose = ({ code }: DiagnosisProp): JSX.Element => {
  const [{ diagnoses }] = useStateValue();
  const diagnosis = diagnoses[code];

  return (
    <>
      <li>
        {diagnosis.code} {diagnosis.name}
      </li>
    </>
  );
};

const SingleEntry = ({ entry }: EntryProp): JSX.Element => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <div style={divStyle}>
          <p>
            {entry.date} <Check />
          </p>
          <i>{entry.description}</i>
          <p>
            <HealthRatingBar
              rating={Number(entry.healthCheckRating)}
              showText={false}
            />
          </p>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((c) => (
                <SingleDiagnose key={c} code={c} />
              ))
            : null}
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div style={divStyle}>
          <p>
            {entry.date} <WorkIcon /> <i>{entry.employerName}</i>
          </p>
          <i>{entry.description}</i>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((c) => (
                <SingleDiagnose key={c} code={c} />
              ))
            : null}
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case 'Hospital':
      return (
        <div style={divStyle}>
          <p>
            {entry.date} <MedicalIcon />
          </p>
          <i>{entry.description}</i>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((c) => (
                <SingleDiagnose key={c} code={c} />
              ))
            : null}
          <p>
            Discharged on {entry.discharge.date}, {entry.discharge.criteria}
          </p>
        </div>
      );
  }
};

const SinglePatientPage = (): JSX.Element => {
  const id = String(useParams().id);
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    let target;

    switch (values.type) {
      case 'Hospital': {
        target = {
          description: values.description,
          date: values.date,
          specialist: values.specialist,
          type: values.type,
          diagnosisCodes: values.diagnosisCodes,
          discharge: {
            date: values.disdate,
            criteria: values.discriteria,
          },
        };
        break;
      }
      case 'HealthCheck': {
        target = {
          description: values.description,
          date: values.date,
          specialist: values.specialist,
          type: values.type,
          diagnosisCodes: values.diagnosisCodes,
          healthCheckRating: HealthCheckRating[values.healthCheckRating],
        };
        break;
      }
      case 'OccupationalHealthcare': {
        target = {
          description: values.description,
          date: values.date,
          specialist: values.specialist,
          type: values.type,
          diagnosisCodes: values.diagnosisCodes,
          employerName: values.employerName,
          sickLeave: {
            startDate: values.sickstartDate,
            endDate: values.sickendDate,
          },
        };
        break;
      }
      default: {
        setError('Not a valid entry type');
        break;
      }
    }

    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        target
      );
      dispatch(modifyPatient(newPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error');
        setError(`Error occured`);
      }
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(modifyPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (patients[id].ssn === undefined) void fetchPatient();
  }, []);

  if (patients[id].ssn === undefined)
    return (
      <>
        <b>Loading...</b>
      </>
    );
  else
    return (
      <>
        <h2>{patients[id].name}</h2>
        <p>ssn: {patients[id].ssn}</p>
        <p>occupation: {patients[id].occupation}</p>
        <h3>Entries:</h3>
        {patients[id].entries.length !== 0 ? (
          patients[id].entries.map((entry) => (
            <SingleEntry key={entry.id} entry={entry} />
          ))
        ) : (
          <p>This person has no entries</p>
        )}
        <AddEntryModal
          modalOpen={modalOpen}
          onClose={closeModal}
          error={error}
          onSubmit={submitNewEntry}
          patient={patients[id]}
        />
        <p></p>
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </>
    );
};

export default SinglePatientPage;
