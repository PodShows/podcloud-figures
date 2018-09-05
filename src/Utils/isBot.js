import crawlers from "crawler-user-agents";

const isBot = userAgent => {
  for (let i = 0; i < crawlers.length; i++) {
    if (RegExp(crawlers[i].pattern).test(userAgent)) {
      return true;
    }
  }
  return false;
};

export default isBot;
