import { supabase } from "../../api";
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer} from 'react';
import { isValidToken, setSession } from "../utils/jwt";

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const handlers = {
    INITIALIZE: (state, action) => {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    },
    LOGIN: (state, action) => {
      const { user } = action.payload;
  
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    },
    LOGOUT: (state) => ({
      ...state,
      isAuthenticated: false,
      user: null,
    }),
    REGISTER: (state, action) => {
      const { user } = action.payload;
  
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    },
};
  

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
    ...initialState,
    method: 'supabase',
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
    children: PropTypes.node,
};

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
          try {
            const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
    
            if (accessToken && isValidToken(accessToken)) {
              setSession(accessToken);
    
              const user = supabase.auth.user();
    
              dispatch({
                type: 'INITIALIZE',
                payload: {
                  isAuthenticated: true,
                  user,
                },
              });
            } else {
              dispatch({
                type: 'INITIALIZE',
                payload: {
                  isAuthenticated: false,
                  user: null,
                },
              });
            }
          } catch (err) {
            console.error(err);
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        };
    
        initialize();
      }, []);
  
    const login = async (email, password) =>{
        try {
             const{user, session, error} = await supabase.auth.signIn({
                email: email,
                password: password
             })

             if(error) throw error;
             else{
                setSession(session.access_token);

                dispatch({
                    type: 'LOGIN',
                    payload: {
                      user,
                    },
                });
             }
        } catch (error) {
            console.log(error);
        }
    };

    const register = async (email, password, userName) => {

        try {
            const { user, session, error } = await supabase.auth.signUp({
                email,
                password
              });

              if(error) throw error;

              else{
                localStorage.setItem('accessToken', session.access_token);
                dispatch({
                    type: 'REGISTER',
                    payload: {
                    user,
                    },
                });
                const { profile, error2 } = await supabase.from('profiles').insert([
                    { id: user.id, name:userName, auth_level:'管理' }
                ]);
                if(error2) throw error2;
                else console.log(profile);
              }      
            
        } catch (error) {
            console.log(error);
        }     
    };

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if(error) throw error;
        } catch (error) {
            console.log(error);
        }    
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
          value={{
            ...state,
            method: 'supabase',
            login,
            logout,
            register,
          }}
        >
          {children}
        </AuthContext.Provider>
    );
  
}

export { AuthContext, AuthProvider };