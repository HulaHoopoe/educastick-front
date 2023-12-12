const BtnImg = ({onClick, disabled, src, alt, imgWidth, imgHeight}) => {
	const disabledOnClick = (e) => {
		e.preventDefault()
		e.stopPropagation()
	}

	if (!disabled)
		return (
			<button className='btn' onClick={onClick}>
				<img src={src} alt={alt} width={imgWidth? imgWidth : 30} height={imgHeight? imgHeight : 30} />
			</button>
		)
	else
		return (
			<button className='btn_disabled' onClick={e => disabledOnClick(e)}>
				<img src={src} alt={alt} width={imgWidth? imgWidth : 30} height={imgHeight? imgHeight : 30} />
			</button>
		)
}

export default BtnImg
