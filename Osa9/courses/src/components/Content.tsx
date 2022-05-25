import { ContentProps, PartProps } from '../types';

const Part = ({ part }: PartProps): JSX.Element => {
  function extraTexts() {
    switch (part.type) {
      case 'normal':
        console.log('normal');
        return <p>{part.description}</p>;
      case 'groupProject':
        console.log('group');
        return <p>project exercises {part.groupProjectCount}</p>;
      case 'submission':
        console.log('submission');
        return (
          <>
            <p>{part.description}</p>Submit to {part.exerciseSubmissionLink}
            <p></p>
          </>
        );
      case 'special':
        console.log('special');
        return (
          <>
            <p>{part.description}</p>
            <p>
              required skills:{' '}
              {part.requirements.map((skill) => ` ${skill}`).toString()}
            </p>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <p>
        <b>
          {part.name} {part.exerciseCount}
        </b>
      </p>
      {extraTexts()}
    </>
  );
};

const Content = ({ courses }: ContentProps): JSX.Element => {
  return (
    <>
      {courses.map((c) => (
        <Part part={c} key={c.name} />
      ))}
    </>
  );
};

export default Content;
