import Url from "../models/urlModel.js";
import shortid from "shortid";

const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  const validUrlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (!validUrlPattern.test(originalUrl)) {
    return res.status(400).json({ message: "Invalid URL format!" });
  }

  if (!originalUrl) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const shortId = shortid.generate();
    const newUrl = await Url.create({ originalUrl, shortId });
    res
      .status(200)
      .json({ shortUrl: `${process.env.BASE_URL}/${newUrl.shortId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    url.clicks += 1;
    url.lastAccessed = new Date();
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUrlStats = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json({
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { shortenUrl, redirectUrl, getUrlStats };
