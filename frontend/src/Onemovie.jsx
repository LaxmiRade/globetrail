const OneMovie = (props) => {
    return (
        <div className="onemovie">
            <figure>
                  <img src={props.image} alt="" />
                  <figcaption>
                    <h3>{props.title}</h3>
                    <p>{props.category}</p>
                  </figcaption>
            </figure>
        </div>
    )
}

export default OneMovie