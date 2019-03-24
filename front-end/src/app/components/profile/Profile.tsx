import * as React from 'react';
import { CardContent, Card, CardHeader, IconButton, MenuItem,
  Menu, ListItemIcon, ListItemText, LinearProgress } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SecurityIcon from '@material-ui/icons/Security';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';

// System-wide.
import { Language, DEFAULT_LANGUAGE } from 'src/translation/translation';
import { materialTranslated } from 'src/utils';

// Model.
import { IProps, IState, Form, styles, UpdatedUser } from './Profile.model';
import { store } from 'src/app/redux';
import { ApiService } from 'src/app/services/api/api';
import { Subscription } from 'indefinite-observable';
import { Unsubscribe } from 'redux';
import ProfileForm from './form/ProfileForm';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { loginUser } from 'src/app/redux/user/actions/login';

/**
 * Component used to create a server.
 * Acts as an orchestrator.
 */
class Profile extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    anchorEl: null,
    loading: true,
    form: {
      username: '',
      email: '',
      language: Language.English
    }
  };

  /** Api. */
  private api: ApiService = ApiService.instance();

  /** Unsubscription manager. */
  private destroy$: Subject<void> = new Subject();

  /** Subscription to Redux. */
  private subscriptionRedux: Unsubscribe;

  /** Says if the component is mounted. */
  private _isMounted: boolean;

  private handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => this.setState({ anchorEl: null });

  /** 
   * Submits the form.
   * @param {Form} form
   */
  private submit = (form: Form, actions: FormikActions<Form>) => {
    this.setState({ loading: true });

    const stopLoading = () => this.setState({ loading: false });

    console.log('Submit');

    this.api.put('/player/@me', form)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UpdatedUser) => {
        store.dispatch(loginUser({
          username: user.username,
          email: user.email,
          language: user.language
        }));

        console.log('data', user);
        stopLoading();
      }, (error) => {
        console.log(error);
        stopLoading();
      });
  };

  componentDidMount() {
    this._isMounted = true;

    const user = store.getState().userReducer;

    const setState = (user: Form) => {
      if (this._isMounted) {
        this.setState({
          loading: false,
          form: {
            ...user
          }
        });
      }
    };

    if (user.username) {
      setState(user as Form);
    } else {
      this.subscriptionRedux = store.subscribe(() => {
        const { userReducer } = store.getState();
        setState(userReducer as Form);
      });
    }
  }

  componentWillUnmount() {
    this.destroy$.next();

    if (this.subscriptionRedux) {
      this.subscriptionRedux();
    }
  }

  render() {
    const { classes, t } = this.props;
    const { form, loading } = this.state;
    const open = Boolean(this.state.anchorEl);

    const validationSchema = Yup.object({
      username: Yup.string()
        .required('SIGNUP.ERRORS.REQUIRED')
        .min(3, 'SIGNUP.ERRORS.USERNAME_LENGTH'),

      email: Yup.string()
        .required('SIGNUP.ERRORS.REQUIRED')
        .email('SIGNUP.ERRORS.EMAIL_REGEX')
    });

    return (
      <React.Fragment>
        <Card className={classes.card}>
          { loading && <LinearProgress/> }
          <CardHeader
            action={
              <React.Fragment>
                <IconButton
                  aria-owns={open ? 'menu-profile' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                >
                  <MoreVertIcon/>
                </IconButton>

                <Menu id="menu-profile"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}>
                  <MenuItem>
                    <ListItemIcon>
                      <SecurityIcon/>
                    </ListItemIcon>
                    <ListItemText inset>
                      {t('PROFILE.MENU.CHANGE_PASSWORD')}
                    </ListItemText>
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon>
                      <DeleteIcon/>
                    </ListItemIcon>
                    <ListItemText inset>
                      {t('PROFILE.MENU.DELETE_ACCOUNT')}
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            }
            title={t('PROFILE.TITLE')}
          />

          <CardContent>
            <Formik
              render={(props) => <ProfileForm {...props} />}
              initialValues={form}
              // Values are retrieved asynchronously.
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={this.submit}
            />
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(Profile, styles);
