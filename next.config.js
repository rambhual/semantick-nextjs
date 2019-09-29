// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:
      "mongodb+srv://Ramprit:pRDx067Uuqbk7slA@mean-app-1btrq.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "fdsfsdhjfgsjkhdgfshgfjshdtruyefhgkufyerjfhsr",
    CLOUDINARY_URL:
      "https://api.cloudinary.com/v1_1/rps-technologies/image/upload",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
