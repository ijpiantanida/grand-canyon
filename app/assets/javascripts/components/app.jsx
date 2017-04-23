const Component = React.Component;
const BrowserRouter = ReactRouterDom.BrowserRouter;
const Link = ReactRouterDom.Link;
const Switch = ReactRouterDom.Switch;
const Route = ReactRouterDom.Route;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: true
    };
  }

  componentDidMount() {
    console.log("I MOUNTED APP");
  }

  render() {
    return (
      <BrowserRouter>
        <div id="app" className="app">
          <div className="app__title-bar">
            <h1 className="app__title">Grand Canyon Tour</h1>
          </div>
          <div className="app__content">
            <nav className="app__nav">
              <Link className="nav__item" to="/">POI List</Link>
              <Link className="nav__item" to="/map">Map</Link>
            </nav>

            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/poi/:id" component={PoiPage}/>
              <Route exact path="/map" render={(args) => <MapPage match={args.match} appState={this.state}/> }/>
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}
