import express from "express";
import request from "request";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import fetch from "node-fetch";
import Token from "./model/tokenSchema.js";
import connectToDatabase from "./database/connection.js";
import multer from "multer";
import FormData from "form-data";

import Razorpay from "razorpay";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
  cors({
    origin: [
      "https://client.singledebt.in",
      "https://enroll.singledebt.in",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://msg.mtalkz.com",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// connect to database
connectToDatabase();

// const razorpay = new Razorpay({
//   key_id: "rzp_live_rTeC0Xl72J36OB	",
//   // key_id: "rzp_live_cRWp492a6sSYQS",
//   // key_id: 'rzp_test_i6at6OINiz1V5I',
//   key_secret: "e96QqM8JNpekJnBXsfch40wg",
// });

const razorpay = new Razorpay({
  key_id: "rzp_live_rTeC0Xl72J36OB",
  key_secret: "e96QqM8JNpekJnBXsfch40wg",
});


// Create order route
app.post("/api/payment/orders", async (req, res) => {
  // console.log("hi");
  const { amount, currency } = req.body;
  const options = {
    amount: amount * 100, // amount in paise
    currency: currency,
    receipt: "receipt#1",
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    console.error("Error creating Razorpay order:", error); // Log the error
    res.status(500).json({ error: "Failed to create order", details: error });
  }
});

// handle requests/response
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// generate token
const generateToken = async () => {
  try {
    const options = {
      refresh_token:
        "1000.a530d33e4a344e47acfc1084c66e7e72.d1be5c5eadffbdcf72f6ad6f891c9f5a",
      client_id: "1000.FJVT66QNSRUXJOLZEYRRVUOAKP064T",
      client_secret: "c46217b322daa316db60f7c6319dd7ca088b7e49d2",
      grant_type: "refresh_token",
    };

    var formBody = [];
    for (var option in options) {
      var encodedKey = encodeURIComponent(option);
      var encodedValue = encodeURIComponent(options[option]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    if (response.status === 200) {
      const data = await response.json();
      await Token.deleteMany(); // Delete existing tokens
      const newToken = new Token({ token: data.access_token });
      await newToken.save();
    } else {
      console.log(
        "Failed to fetch token:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

// Schedule token generation every 15 minutes
cron.schedule("*/15 * * * *", generateToken);

// Example route to get the latest token
app.get("/token/generate", async (req, res) => {
  try {
    let latestToken = await Token.findOne().sort({ createdAt: -1 }).exec();
    if (!latestToken) {
      await generateToken();
      latestToken = await Token.findOne().sort({ createdAt: -1 }).exec();
    }
    return res.json({ token: latestToken.token });
  } catch (error) {
    console.error("Error fetching or generating token:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/token", async (req, res) => {
  try {
    const token = await Token.find({});
    if (!token) {
      return res.status(400).json({ message: "Failed to fetch token" });
    } else {
      return res.status(200).json({ token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

// proxy request
app.get("/proxy", (req, res) => {
  let url = req.query.url;
  const email = req.query.email;
  const authorization = req.header("Authorization");
  //
  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  //
  const headers = {
    Authorization: authorization,
  };
  if (email) {
    const urlObj = new URL(url);
    urlObj.searchParams.append("email", email);
    url = urlObj.toString();
  }

  if (userId) {
    const urlObj = new URL(url);
    urlObj.searchParams.append("userId", userId);
    url = urlObj.toString();
  }

  const options = {
    url: url,
    headers: headers,
  };
  request(options).pipe(res);
});
//
const upload = multer();
app.post("/proxy", upload.any(), async (req, res) => {
  const url = req.query.url;
  const authorization = req.header("Authorization");

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  try {
    let response;
    const headers = {
      Authorization: authorization,
    };

    if (req.is("multipart/form-data")) {
      // Handle multipart/form-data
      const form = new FormData();
      for (const key in req.body) {
        form.append(key, req.body[key]);
      }
      req.files.forEach((file) => {
        form.append(file.fieldname, file.buffer, file.originalname);
      });

      headers["Content-Type"] = form.getHeaders()["content-type"];

      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: form,
      });
    } else {
      // Handle application/json
      headers["Content-Type"] = "application/json";

      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          data: req.body,
        }),
      });
    }

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (error) {
    console.error("Error occurred while proxying request:", error);
    return res.status(500).send({
      message: "Error occurred while proxying request",
      error: error.message,
      stack: error.stack,
    });
  }
});
//
app.put("/proxy", upload.any(), async (req, res) => {
  const url = req.query.url;
  const authorization = req.header("Authorization");

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  try {
    let response;
    const headers = {
      Authorization: authorization,
    };

    if (req.is("multipart/form-data")) {
      // Handle multipart/form-data
      const form = new FormData();
      for (const key in req.body) {
        form.append(key, req.body[key]);
      }
      req.files.forEach((file) => {
        form.append(file.fieldname, file.buffer, file.originalname);
      });

      headers["Content-Type"] = form.getHeaders()["content-type"];

      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: form,
      });
    } else {
      // Handle application/json
      headers["Content-Type"] = "application/json";

      response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          data: req.body,
        }),
      });
    }

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (error) {
    console.error("Error occurred while proxying request:", error);
    return res.status(500).send({
      message: "Error occurred while proxying request",
      error: error.message,
      stack: error.stack,
    });
  }
});
//
const generateTicketToken = async (req, res) => {
  try {
    const options = {
      refresh_token:
        "1000.a530d33e4a344e47acfc1084c66e7e72.d1be5c5eadffbdcf72f6ad6f891c9f5a",
      client_id: "1000.FJVT66QNSRUXJOLZEYRRVUOAKP064T",
      client_secret: "c46217b322daa316db60f7c6319dd7ca088b7e49d2",
      grant_type: "refresh_token",
    };

    var formBody = [];
    for (var option in options) {
      var encodedKey = encodeURIComponent(option);
      var encodedValue = encodeURIComponent(options[option]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return res.status(200).send(data);
    } else {
      console.log(
        "Failed to fetch token:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
app.get("/ticket", generateTicketToken);


// root request
app.get("/", (req,res) => {
  res.send("SD portal (test)")
})

// start server
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.js;

// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cron from 'node-cron';
// import fetch from 'node-fetch';
// import mongoose from 'mongoose';
// import Razorpay from 'razorpay';
// import Token from './model/tokenSchema.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 8012;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Database connection
// mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// // Generate Zoho OAuth token
// const generateToken = async () => {
//   const options = {
//     refresh_token: process.env.ZOHO_REFRESH_TOKEN,
//     client_id: process.env.ZOHO_CLIENT_ID,
//     client_secret: process.env.ZOHO_CLIENT_SECRET,
//     grant_type: "refresh_token",
//   };

//   const formBody = Object.entries(options)
//     .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
//     .join("&");

//   try {
//     const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: formBody,
//     });

//     const responseData = await response.json();

//     if (response.ok) {
//       await Token.deleteMany(); // Delete existing tokens
//       const newToken = new Token({ token: responseData.access_token });
//       await newToken.save();
//       console.log("Token saved successfully.");
//     } else {
//       console.error("Failed to fetch token:", responseData); // Log the full error response
//     }
//   } catch (error) {
//     console.error("Error generating token:", error);
//   }
// };

// // Schedule token generation every 15 minutes
// cron.schedule("*/15 * * * *", generateToken);

// // Endpoint to create Razorpay order
// app.post("/api/payment/orders", async (req, res) => {
//   const { amount, currency } = req.body;
//   const options = {
//     amount: amount * 100, // amount in paise
//     currency,
//     receipt: "receipt#1",
//   };

//   try {
//     const response = await razorpay.orders.create(options);
//     res.json(response);
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ error: "Failed to create order", details: error });
//   }
// });

// // Endpoint to get the latest Zoho token
// app.get("/token/generate", async (req, res) => {
//   try {
//     let latestToken = await Token.findOne().sort({ createdAt: -1 }).exec();
//     if (!latestToken) {
//       await generateToken();
//       latestToken = await Token.findOne().sort({ createdAt: -1 }).exec();
//     }
//     res.json({ token: latestToken.token });
//   } catch (error) {
//     console.error("Error fetching or generating token:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Proxy endpoint
// app.post("/proxy", async (req, res) => {
//   const { url } = req.query;
//   const authorization = req.header("Authorization");

//   if (!url) {
//     return res.status(400).send("URL query parameter is required");
//   }

//   const headers = {
//     Authorization: authorization,
//     "Content-Type": "application/json",
//   };

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers,
//       body: JSON.stringify(req.body),
//     });

//     const data = await response.json();
//     return res.status(response.status).json(data);
//   } catch (error) {
//     console.error("Error occurred while proxying request:", error);
//     return res.status(500).json({ message: "Error occurred while proxying request", error: error.message });
//   }
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
