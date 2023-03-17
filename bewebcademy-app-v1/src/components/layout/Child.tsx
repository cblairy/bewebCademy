const Child = (props: any) => {
    const handleClick = props.handleClick
    return (
        <div>
            <button onClick={event => handleClick(100)}>Click</button>
        </div>
    )
}

export default Child;