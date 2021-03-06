import React, { Component } from 'react';
import { Link } from 'react-router';
import HamburgerMenu from 'react-hamburger-menu';
import cssModules from 'react-css-modules';
import headerStyles from '../style/header.css';

@cssModules(headerStyles)
export default class Header extends Component {
  state = {
    open: false
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.refs.mobileMenuContainer) {
      setTimeout(() => {
        this.refs.mobileMenuContainer.style.left = 0;
        this.refs.overlay.style.opacity = 1;
      }, 100);
    }
  }

  isAdminUser() {
    const { user } = this.props;
    return process.env.FIREBASE_ADMIN_USERS.split(',').indexOf(user.email) !== -1;
  }

  render() {
    const { path, user, styles } = this.props;

    return (
      <div>
        {this.state.open &&
          <div>
            <div
              styleName='mobile-menu-container'
              ref='mobileMenuContainer'
            >
              <div styleName='mobile-menu-icon-inner'>
                <HamburgerMenu
                  isOpen={this.state.open}
                  menuClicked={this.toggleMenu.bind(this)}
                  width={18}
                  height={15}
                  strokeWidth={2}
                  rotate={0}
                  color='#333'
                  borderRadius={0}
                  animationDuration={0.5}
                />
              </div>

              <h2 styleName='mobile-menu-header'>Mud Dohgs</h2>

              <nav styleName='mobile-menu'>
                <ul>
                  <li>
                    <Link
                      to='/'
                      onClick={this.toggleMenu.bind(this)}
                    >
                      Schedule
                    </Link>
                  </li>

                  <li>
                    <Link
                      to='/standings'
                      onClick={this.toggleMenu.bind(this)}
                    >
                      Standings
                    </Link>
                  </li>

                  {user.isLoggedIn && this.isAdminUser() &&
                    <li>
                      <Link
                        to='/admin'
                        onClick={this.toggleMenu.bind(this)}
                      >
                        Admin
                      </Link>
                    </li>
                  }

                  {user.isLoggedIn ?
                    <li>
                      <Link
                        to='/logout'
                        onClick={this.toggleMenu.bind(this)}
                      >
                        Logout
                      </Link>
                    </li>
                  :
                    <li>
                      <Link
                        to='/login'
                        onClick={this.toggleMenu.bind(this)}
                      >
                        Login
                      </Link>
                    </li>
                  }
                </ul>
              </nav>
            </div>

            <div
              styleName='overlay'
              ref='overlay'
              onClick={this.toggleMenu.bind(this)}
            >
            </div>
          </div>
        }

        <div className={styles.navbar}>
          <div styleName='navbar-brand'>
            <Link to='/'>
              <span styleName='navbar-team'>Mud Dohgs</span>
            </Link>

            <span styleName='navbar-section'>
              <Link
                to='/'
                styleName={path === '' ? 'navbar-link-active' : 'navbar-link'}
              >
                Schedule
              </Link>

              <Link
                to='/standings'
                styleName={path === 'standings' ? 'navbar-link-active' : 'navbar-link'}
              >
                Standings
              </Link>

              {user.isLoggedIn && this.isAdminUser() &&
                <Link
                  to='/admin'
                  styleName={path === 'admin' ? 'navbar-link-active' : 'navbar-link'}
                >Admin</Link>
              }

              {user.isLoggedIn &&
                <span>
                  <img
                    styleName='avatar'
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                  {user.displayName}
                </span>
              }

              {user.isLoggedIn ?
                <Link styleName="navbar-link" to='/logout'>
                  Logout
                </Link>
              :
                <Link
                  to='/login'
                  styleName={path === 'login' ? 'navbar-link-active' : 'navbar-link'}
                >
                  Login
                </Link>
              }
            </span>

            <div styleName='mobile-menu-icon'>
              <HamburgerMenu
                isOpen={this.state.open}
                menuClicked={this.toggleMenu.bind(this)}
                width={18}
                height={15}
                strokeWidth={2}
                rotate={0}
                color='#bbb'
                borderRadius={0}
                animationDuration={0.5}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
