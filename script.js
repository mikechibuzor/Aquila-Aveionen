const app = Vue.createApp({
  mounted() {
    this.getData();
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      instagram: "",
      twitter: "",
      snapchat: "",
      email: "",
      preloaderShow: true,
      fetchError: false,
      fetchMessage: "Fetching data - Please wait...",
    };
  },
  methods: {
    handleRequest(url) {
      return fetch(url).then((response) => response.json());
    },
    async getData() {
      try {
        const response = await this.handleRequest(
          "https://hirng-x2021.glitch.me/api"
        );
        const responseData = await response;
        this.preloaderShow = false;
        const name = responseData.name;
        const socialMedia = responseData.social_media;
        const { email, instagram, snapchat, twitter } = socialMedia;
        const fullname = name.split(" ");

        this.firstname = fullname[0];
        this.lastname = fullname[1];
        this.email = email;
        this.instagram = instagram;
        this.snapchat = snapchat;
        this.twitter = twitter;
      } catch (error) {
        this.fetchError = true;
        this.fetchMessage = "Something went wrong";
        console.log(error);
      }
    },
  },
});

app.mount("#app");
