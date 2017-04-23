const PoiLink = ({poi}) => {
  return (<div className="home__poi-link" >
    <Link to={"/poi/" + poi.id}>{poi.name}</Link>
  </div>)
};
