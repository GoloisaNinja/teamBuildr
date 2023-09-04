import g from '../../index.module.scss';

const BasicWrapper = ({ children }) => {
	return <div className={`${g.pdl}`}>{children}</div>;
};
export default BasicWrapper;
