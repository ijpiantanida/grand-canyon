class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      poi: []
    }
  }

  componentDidMount() {
    fetch("/api/poi")
      .then(response => response.json())
      .then(data => this.setState({loading: false, poi: data.poi}));
  }

  render() {
    let content;

    if (this.state.loading) {
      content = <div className="loader">Loading POIs</div>;
    } else {
      const poiEls = this.state.poi.map(poi => <PoiLink key={poi.id} poi={poi} />);
      content = (<div className="home__poi-list">
        {poiEls}
      </div>);
    }

    return (<div className="home">
      <h2 className="home__title">Points of Interest</h2>
      {content}
    </div>)
  }
}