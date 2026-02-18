const Buttons =({name,onClick,className})=>{
    return (
        <button type="button" className={className} onClick={onClick}>
            {name}
        </button>
    );
};
export default Buttons;