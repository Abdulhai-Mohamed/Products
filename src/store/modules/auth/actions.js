import router from "./../../../router";
import axios from "axios";
let timer;
let counter = 0;

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDY0-6p1ou8zlBOkAlnq9oHX7q72IeUs5c";

    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDY0-6p1ou8zlBOkAlnq9oHX7q72IeUs5c";
    }

    const { status, data } = await axios
      .post(
        url,
        JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      // .then((res) => {

      //   console.log(res, "res");
      // })

      .catch((err) => {
        // console.log(err, "err");

        const {
          response: {
            data: { error },
          },
        } = err;
        // console.log(error, "error");
        // console.log("erssssssssssssssssssssssssssror");

        context.state.error = error.errors;
        throw new Error(error.message);
      });

    // console.log(status, "status ");
    // save user data
    if (status === 200) {
      const redirectUrl = router.currentRoute.query.redirectUrl || "products";
      console.log(redirectUrl, "redirectUrl from login action");
      await router.replace(redirectUrl).catch((err) => {});
      // console.log(redirectUrl, "redirectUrl from login action");
      context.dispatch("setUserData", data);
    }
  },
  setUserData(context, payload) {
    // 1-set timer for  auto logout
    timer = setTimeout(function () {
      context.dispatch("logout");
      context.commit("setAutoLogout");
    }, +payload.expiresIn * 1000);

    //2-save user data in state
    context.commit("setUser", {
      token: payload.idToken,
      userId: payload.localId,
      expiration: +payload.expiresIn,
    });

    // 3-save user data in storge
    let expirationDate = new Date().getTime() + +payload.expiresIn * 1000;
    localStorage.setItem("Refresh token", payload.refreshToken);
    localStorage.setItem("expirationDate", expirationDate);
  },

  async tryLogin(context, redirectUrl) {
    // alert("tryLogin");
    // alert(counter);

    const refreshToken = localStorage.getItem("Refresh token");

    if (refreshToken && counter === 0) {
      counter++;
      // alert(counter);
      const { status, data } = await axios
        .post(
          "https://securetoken.googleapis.com/v1/token?key=AIzaSyDY0-6p1ou8zlBOkAlnq9oHX7q72IeUs5c",

          {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          }
        )
        .catch((err) => console.log(err, "refresh err"));

      if (status == 200) {
        // alert("tryLogin 200");

        // console.log(data, "refresh data");
        let expirationDate = localStorage.getItem("expirationDate");
        let now = new Date().getTime();

        let restTime = Math.round((expirationDate - now) / 1000); // /1000 to get seconds
        // console.log(restTime, "restTime");

        const payload = {
          idToken: data.id_token,
          localId: data.user_id,
          expiresIn: restTime,
          refreshToken: data.refresh_token,
        };

        const theRedirectUrl = redirectUrl || "products";
        // console.log(theRedirectUrl, "theRedirectUrl from trylogin action");
        // await router.replace(theRedirectUrl).catch((err) => {});
        context.dispatch("setUserData", payload);
        // alert("tryLogin200");
      }
      counter = 0;
      // alert(counter);

    }
  },

  async logout(context) {
    localStorage.removeItem("Refresh token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    clearTimeout(timer);
    context.commit("setUser", {
      token: null,
      userId: null,
      expiration: null,
    });
    await router.replace("/products").catch((err) => {});
  },
};
