const proxy = require("http-proxy-middleware");
const URL_PARAMS =
  "response_type=code&client_id=INC000002524851&resource=sg_edu_nus_oauth&redirect_uri=https%3A%2F%2Ffrenergy.vercel.app%2F";
module.exports = function (app) {
  app.use(
    proxy(`/adfs/oauth2/authorize?${URL_PARAMS}`, {
      target: "https://vafs.nus.edu.sg",
      secure: false,
    })
  );
};
