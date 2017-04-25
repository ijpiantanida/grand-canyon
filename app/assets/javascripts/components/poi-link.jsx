const PoiLink = ({poi}) => {
  return (<span className="poi-link" >
    <NavLink to={"/poi/" + poi.id}>{poi.name}</NavLink>
  </span>)
};
