const BtnDel = props => {
	const disabledOnClick = (e) => {
		e.stopPropagation()
	}

	if (!props.disabled)
		return (
			<div className='btn' onClick={props.onClick}>
				<img src={props.src} alt={props.alt} width={30} height={30} />
			</div>
		)
	else
		return (
			<div className='btn_disabled' onClick={e => disabledOnClick(e)}>
				<img src={props.src} alt={props.alt} width={30} height={30} />
			</div>
		)
}

export default BtnDel
