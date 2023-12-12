const BtnText = ({text, onClick, disabled}) => {
 const disabledOnClick = (e) => {
	e.preventDefault()
	e.stopPropagation()
 }
if (!disabled)
	return (
		<button className='btn' onClick={onClick}>{text}</button>
	)
else
	return (
		<button className='btn_disabled' onClick={e => disabledOnClick(e)}>{text}</button>
	)
}

export default BtnText