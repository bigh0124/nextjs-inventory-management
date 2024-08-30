type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  return <div className="text-2xl text-gray-700 font-semibold">{name}</div>;
};

export default Header;
