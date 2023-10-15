// Imports
const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const { validateURL } = require("../helpers");

// Initialize Prisma
const prisma = new PrismaClient();

// Create an Express router
const router = express.Router();

// Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// POST endpoint to generate a short URL
router
  .post("/shorturl", async (req, res) => {
    const { url } = req.body;

    const validatedUrl = await validateURL(url);

    if (validatedUrl) {
      const newShortUrl = await prisma.shortUrl.create({
        data: {
          redirectTo: validatedUrl,
        },
      });

      if (newShortUrl) {
        res.status(200).json({
          original_url: newShortUrl.redirectTo,
          short_url: newShortUrl.id,
        });
        return;
      } else {
        res.sendStatus(500);
        return;
      }
    } else {
      res.json({
        error: "invalid url",
      });
      return;
    }
  })
  // GET Endpoint to redirect
  .get("/shorturl/:id", async (req, res) => {
    // Params
    const id = parseInt(req.params.id);

    // throw 404 if id is not an int
    if (!id) {
      res.sendStatus(404);
      return;
    }

    // Find url from db
    const shortUrl = await prisma.shortUrl.findUnique({
      where: {
        id,
      },
    });

    // url not found, throw 404
    if (!shortUrl) {
      res.sendStatus(404);
      return;
    }

    // url found, redirect to it
    res.redirect(shortUrl.redirectTo);
  });

module.exports = router;
