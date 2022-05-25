import { HeaderProps } from '../types';

const Header = ({ courseName }: HeaderProps): JSX.Element => {
  return <h1>{courseName}</h1>;
};

export default Header;
