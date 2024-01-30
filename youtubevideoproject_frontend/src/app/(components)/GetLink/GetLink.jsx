// converting component into client side component
"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";

const GetLink = () => {
  const [linkText, setLinkText] = useState("");
  const [linkData, setLinkData] = useState({});
  const handleDownload = async () => {
    if (linkText === "") {
      alert("Please enter a link");
      return;
    }

    // second check to see if the link is a valid youtube link
    if (!linkText.includes("youtube.com")) {
      alert("Please enter a valid youtube link");
      return;
    }

    const yid = linkText.split("=")[1];
    console.log(yid);

    const response = await axios.get(
      `http://localhost:8888/api/yt/download/${yid}`
    );
    console.log(response.data);
    setLinkData(response.data);
  };
  return (
    <>
      <Box>
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                pb={5}
                variant="h3"
                sx={{ textAlign: "center", fontFamily: "Poppins" }}
              >
                Enter your Youtube Video Link
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  label="Youtube Link"
                  variant="outlined"
                  sx={{ width: { xs: "100%", md: "70%" } }}
                />

                <Button
                  onClick={handleDownload}
                  variant="contained"
                  sx={{
                    borderRadius: "0px 8px 8px 0px",
                    backgroundColor: "#ff5252",
                  }}
                >
                  <DownloadIcon />
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* // to display any error here  */}
          <span></span>

          {/* // by using mui displaying the thumbnail title and 3 differents links
          comping from the backend */}
          <Grid container style={{ marginTop: "50px" }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={linkData?.thumb}
                  alt="thumbnail"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontFamily: "Poppins" }}
                >
                  {linkData?.title}
                </Typography>
              </Box>
              {/* // as in linkData we have a array of links we are using map to
              display three links // and using the a tag to download the video */}
              {linkData?.links?.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <a
                    href={item.link}
                    download
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      backgroundColor: "#ff5252",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      margin: "10px 0px",
                      cursor: "pointer",
                    }}
                    target="_blank"
                  >
                    {item.quality}
                  </a>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default GetLink;
