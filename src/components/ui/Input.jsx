const Input = (props) => {
 return <input type='text' className='input' disabled={props?.disabled } placeholder={props?.placeholder} value={props?.value} onChange={props?.onChange}/>
}

export default Input