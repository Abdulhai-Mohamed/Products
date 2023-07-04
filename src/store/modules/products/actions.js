export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue-http-7c739-default-rtdb.firebaseio.com//products/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
  async loadproducts(context, payload) {
    // console.log("loadproducts...");

    const lastFetch = context.state.lastFetch;
    if (!lastFetch) {
      //first fetch where lastfetch ===null

      context.state.lastFetch = new Date().getTime();
      await ss();
    } else {
      const currentTimeStamp = new Date().getTime();
      // console.log((currentTimeStamp - lastFetch) / 1000 > 60);

      if (!((currentTimeStamp - lastFetch) / 1000 > 60)) {
        // console.log("nooooooooo fetch requrired");
        return;
      } else {
        await ss();
      }
    }

    async function ss() {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }
      // const products = [];
      // responseData.forEach((product) => {
      //   products.push(product);
      // });
      context.commit("setproducts", responseData);

      context.state.lastFetch = new Date().getTime();
    }
  },
};
