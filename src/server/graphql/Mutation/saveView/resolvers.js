export const saveView = {
  saveView: ({ FeedID, IP, UserAgent, Referer } = {}) => {
    console.log({ FeedID, IP, UserAgent, Referer });
    return false;
  }
};

export default saveView;
