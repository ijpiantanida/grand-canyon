class PoiPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.match.params.id;
    let newId = this.props.match.params.id;
    if (newId !== oldId) {
      this.fetchPoi(newId);
    }
  }

  componentDidMount() {
    this.fetchPoi(this.props.match.params.id);
  }

  fetchPoi(id) {
    this.setState({loading: true});
    fetch("/api/poi/" + id)
      .then(response => response.json())
      .then(data => this.setState({loading: false, poi: data}));
  }

  render() {
    if(!this.props.appState.online) {
      return <OfflineNotice />;
    }

    if(this.state.loading) {
      return <div>Loading POI</div>;
    }

    const poi = this.state.poi;
    return (<div className="poi">
      <h2 className="poi__name">{poi.name}</h2>
      <div className="poi__description">
        {poi.description}
      </div>
    </div>)
  }
}