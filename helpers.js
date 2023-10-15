const dns = require("dns");
// Helper function to validate URL
const validateURL = async (url) => {
  try {
    const parsedUrl = new URL(url);
    const { hostname } = parsedUrl;

    return new Promise((resolve) => {
      dns.lookup(hostname, (err) => {
        if (!err) {
          resolve(parsedUrl);
        } else {
          resolve(null);
        }
      });
    });
  } catch (error) {
    return null;
  }
};

module.exports = { validateURL };
