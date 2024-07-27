import { defineStore } from 'pinia';
import { auth } from '@/firebase/config';
import {
     type User,
     updateProfile,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     GithubAuthProvider,
     GoogleAuthProvider,
     signOut,
     signInWithPopup,
} from 'firebase/auth';
import { toast } from '@/components/ui/toast';
import { useLocalStorage } from '@vueuse/core';

interface UserInfo {
     user: User | any;
     isAuthenticated: boolean;
     token: string;
}

interface UserValues {
     name?: string;
     email: string;
     password: string;
}

interface AuthState {
     isAuth: UserInfo;
     error: string | null;
}

export const useAuthStore = defineStore('auth', {
     state: (): AuthState => ({
          isAuth: useLocalStorage('user', {
               user: null,
               isAuthenticated: false,
               token: '',
          }) as any,
          error: null,
     }),

     actions: {
          async createWithEmail(values: UserValues) {
               try {
                    const result: any = await createUserWithEmailAndPassword(
                         auth,
                         values.email,
                         values.password,
                    );
                    const data = result.user;

                    if (data) {
                         await updateProfile(data, {
                              displayName: values.name,
                         });

                         const userInfo = {
                              displayName: data.displayName,
                              email: data.email,
                              refreshToken: data.stsTokenManager.refreshToken,
                              creationTime: data.metadata.creationTime,
                              providerId: data.providerData[0].providerId,
                              pictureURL: data.photoURL,
                         };

                         this.isAuth = {
                              user: userInfo,
                              isAuthenticated: true,
                              token: data.accessToken,
                         };
                    }

                    toast({
                         title: 'Successfully',
                         description: `${result.user.displayName} - you successfully signed in`,
                    });

                    this.error = null;
               } catch (err: any) {
                    switch (err.code) {
                         case 'auth/email-already-in-use':
                              this.error = 'Email exists';
                              break;
                         case 'auht/operatipn-now-allowed':
                              this.error = 'Operation not allowed';
                              break;
                         default:
                              this.error = 'Error: ' + err.message;
                              break;
                    }

                    this.isAuth = {
                         user: {},
                         isAuthenticated: false,
                         token: '',
                    };

                    toast({
                         title: 'Errors',
                         description: 'Error: ' + this.error,
                    });
               }
          },

          async signInWithEmail(values: UserValues) {
               try {
                    const result: any = await signInWithEmailAndPassword(
                         auth,
                         values.email,
                         values.password,
                    );
                    const data = result.user;

                    const userInfo = {
                         displayName: data.displayName,
                         email: data.email,
                         accessToken: data.accessToken,
                         refreshToken: data.stsTokenManager.refreshToken,
                         creationTime: data.metadata.creationTime,
                         providerId: data.providerData[0].providerId,
                         pictureURL: data.photoURL,
                    };

                    this.isAuth = {
                         user: userInfo,
                         isAuthenticated: true,
                         token: data.accessToken,
                    };

                    toast({
                         title: 'Successfully',
                         description: `${result.user.displayName} - you successfully signed in`,
                    });

                    this.error = null;
               } catch (err: any) {
                    switch (err.code) {
                         case 'auth/invalid-credential':
                              this.error = 'Incorrect Email or Password';
                              break;
                         case 'auth/invalid-email':
                              this.error = 'The email address is not valid.';
                              break;
                         case 'auth/user-disabled':
                              this.error =
                                   'The user account has been disabled by an administrator.';
                              break;
                         case 'auth/user-not-found':
                              this.error =
                                   'There is no user record corresponding to this identifier. The user may have been deleted.';
                              break;
                         case 'auth/wrong-password':
                              this.error =
                                   'The password is invalid or the user does not have a password.';
                              break;
                         case 'auth/operation-not-allowed':
                              this.error =
                                   'Sign-in operation is not allowed. Please contact support.';
                              break;
                         case 'auth/network-request-failed':
                              this.error = 'A network error occurred. Please try again later.';
                              break;
                         default:
                              this.error = 'Error';
                              break;
                    }

                    this.isAuth = {
                         user: {},
                         isAuthenticated: false,
                         token: '',
                    };

                    toast({
                         title: 'Errors',
                         description: 'Error: ' + this.error,
                    });
               }
          },

          async signInWithGitHub() {
               try {
                    const result: any = await signInWithPopup(auth, new GithubAuthProvider());
                    const data = result.user;

                    const userInfo = {
                         displayName: data.displayName,
                         email: data.email,
                         accessToken: data.accessToken,
                         refreshToken: data.stsTokenManager.refreshToken,
                         creationTime: data.metadata.creationTime,
                         providerId: data.providerData[0].providerId,
                         pictureURL: data.photoURL,
                    };

                    this.isAuth = {
                         user: userInfo,
                         isAuthenticated: true,
                         token: data.accessToken,
                    };

                    toast({
                         title: 'Successfully',
                         description: `${data.reloadUserInfo.screenName} - you successfully signed in`,
                    });

                    this.error = null;
               } catch (err) {
                    throw err;
               }
          },

          async signInWithGoogle() {
               try {
                    const result: any = await signInWithPopup(auth, new GoogleAuthProvider());
                    const data = result.user;

                    const userInfo = {
                         displayName: data.displayName,
                         email: data.email,
                         accessToken: data.accessToken,
                         refreshToken: data.stsTokenManager.refreshToken,
                         creationTime: data.metadata.creationTime,
                         providerId: data.providerData[0].providerId,
                         pictureURL: data.photoURL,
                    };

                    this.isAuth = {
                         user: userInfo,
                         isAuthenticated: true,
                         token: data.accessToken,
                    };

                    toast({
                         title: 'Successfully',
                         description: `${result.user.displayName} - you successfully signed in`,
                    });

                    this.error = null;
               } catch (err) {
                    throw err;
               }
          },

          async logout() {
               signOut(auth);
               this.isAuth = {
                    user: null,
                    isAuthenticated: false,
                    token: '',
               };

               localStorage.clear();
               this.error = null;
          },
     },
});
