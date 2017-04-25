const Component = React.Component;
const BrowserRouter = ReactRouterDom.BrowserRouter;
const NavLink = ReactRouterDom.NavLink;
const Switch = ReactRouterDom.Switch;
const Route = ReactRouterDom.Route;
const GoogleMapReact = GoogleMapReact.default;

const RouteWithAppState = ({component: ComponentName, appState, ...rest}) => (
  <Route {...rest} render={(args) => <ComponentName {...args} appState={appState}/>}/>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: true
    };
  }

  componentDidMount() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.onmessage = (event) => {
        console.log("Broadcasted from SW : ", event.data);

        const data = event.data;
        if (data.command === "networkStatus") {
          this.setState({online: data.online});
        }

        if(data.command === "reload") {
          window.location.reload();
        }
      };
    }
    window.addEventListener('online',  () => this.toggleNetwork(true));
    window.addEventListener('offline', () => this.toggleNetwork(false));
  }

  toggleNetwork(state) {
    this.setState({online: state});
  }

  render() {
    let networkStatus;
    if(!this.state.online) {
      networkStatus = <span className="app__network-state">OFFLINE</span>;
    }

    return (
      <BrowserRouter>
        <div id="app" className="app">
          <div className="app__title-bar">
            <h1 className="app__title">Grand Canyon Tour</h1>
          </div>
          <div className="app__content">
            <nav className="app__nav">
              <NavLink className="nav__item" to="/" exact activeClassName="nav__item--active" isActive={(match, location) => match || location.pathname.match(/poi/)} >What to visit?</NavLink>
              <NavLink className="nav__item" to="/map" exact activeClassName="nav__item--active">Map</NavLink>
              <div className="nav__item-separator" />
              {networkStatus}
            </nav>

            <Switch>
              <RouteWithAppState path="/" exact component={HomePage} appState={this.state} />
              <RouteWithAppState path="/poi/:id" component={PoiPage} appState={this.state} />
              <RouteWithAppState path="/map" component={MapPage} appState={this.state} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}
