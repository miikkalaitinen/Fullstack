import { FooterProps } from '../types';

const Footer = ({ courses }: FooterProps): JSX.Element => {
  return (
    <p>
      {' '}
      Number of exercises {courses.reduce(
        (a, b) => a + b.exerciseCount,
        0
      )}{' '}
    </p>
  );
};

export default Footer;
