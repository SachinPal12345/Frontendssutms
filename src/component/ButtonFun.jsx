import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Sidebar from "./Sidebar";
import "./Button.css";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import { Grid } from "@mui/material";
import { State, City } from "country-state-city";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Table from "react-bootstrap/Table";

const ButtonFun = () => {
  const [selectedOption, setSelectedOption] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  // ////////////////pagination table states/////////////////////////////
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const userData = JSON.parse(localStorage.getItem("currentUser"));
  const studentId = userData.user;

  /////////////////////////////////////////PERSONAL FORM API///////////////////////////////////////
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    mobile: "",
    category: "",
    email: "",
    qualification: "",
    lastExamPassingYear: "",
    passingYear: "",
    qualifyingExamPercentage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const apiUrl = "https://api.example.com/data";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ////////////////////////////PERSONAL FORM API///////////////////////////////////////////////////////////////
  // //////////////////////////////PROFESSIONAL FORM API//////////////////////////////////////////////////

  const [formData1, setFormData1] = useState({
    Handicapped: "",
    Medium: "",
    Nationality: "",
    Domicile: "",
    ScholarshipRequired: "",
    FathersOccupation: "",
    MothersOccupation: "",
    FathersIncome: "",
    MothersIncome: "",
    SamagraId: "",
    AadharNumber: "",
    ParentMobile: "",
  });

  const handleChange2 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };
  // ///////////////////////////PROFESSIONAL FORM ////////////////////////////////////////////////
  // //////////////////////////////////ADDRESS FORM API////////////////////////////////////////

  const [formData2, setFormData2] = useState({
    address1: "",
    address2: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
  });
  const handleChange4 = (e) => {
    const { name, value } = e.target;
    setFormData2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //////////////////////////////ADDRESS FORM API/////////////////////////////////////
  ///////////////////////////////////////////STATE API///////////////////////////////////////
  useEffect(() => {
    const getAllStates = async () => {
      try {
        const statesData = await State.getStatesOfCountry("IN");
        setStates(statesData);
      } catch (err) {
        console.log(err);
      }
    };

    getAllStates();
  }, []);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    if (selectedState) {
      const countryCode = "IN";
      try {
        const stateCities = City.getCitiesOfState(countryCode, selectedState);
        setCities(stateCities);
      } catch (err) {
        console.log(err);
      }
    } else {
      setCities([]);
    }
  };

  const [formData3, setFormData3] = useState({
    tenthSchool: "",
    tenthPassingYear: "",
    tenthRollNo: "",
    tenthBoard: "",
    tenthExamType: "",
    tenthMarksObtain: "",
    tenthMaxMarks: "",
    tenthPercentage: "",
    twelfthSchool: "",
    twelfthPassingYear: "",
    twelfthRollNo: "",
    twelfthBoard: "",
    twelfthExamType: "",
    twelfthMarksObtain: "",
    twelfthMaxMarks: "",
    twelfthPercentage: "",
    graduationCollege: "",
    graduationPassingYear: "",
    graduationRollNo: "",
    graduationUniversity: "",
    graduationExamType: "",
    graduationMarksObtain: "",
    graduationMaxMarks: "",
    graduationPercentage: "",
    postGraduationCollege: "",
    postGraduationPassingYear: "",
    postGraduationRollNo: "",
    postGraduationUniversity: "",
    postGraduationExamType: "",
    postGraduationMarksObtain: "",
    postGraduationMaxMarks: "",
    postGraduationPercentage: "",
    otherExam: "",
    otherSchool: "",
    otherPassingYear: "",
    otherRollNo: "",
    otherBoard: "",
    otherExamType: "",
    otherMarksObtain: "",
    otherMaxMarks: "",
    otherPercentage: "",
  });

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setFormData3({
      ...formData3,
      [name]: value,
    });
  };

  // Call the function to update student data
  //updateStudentData();

  const [fileUrls, setFileUrls] = useState({
    applicantPhoto: "",
    applicantSignature: "",
    aadharCard: "",
    marksheet10th: "",
    marksheet12th: "",
    undergraduateCertificate: "",
    postgraduateCertificate: "",
    domicileCertificate: "",
    transferCertificate: "",
    incomeCertificate: "",
    migrationCertificate: "",
    otherCertificate: "",
  });

  const handleFileChange = async (fieldName, e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      // Upload file to Cloudinary
      const formData4 = new FormData();
      formData4.append("file", file);
      formData4.append("upload_preset", "upload");

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/ankitmewada/image/upload`,
        {
          method: "POST",
          body: formData4,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      const fileUrl = cloudinaryData.secure_url;
      console.log("fkdjf", fileUrl);

      setFileUrls((prevFileUrls) => ({
        ...prevFileUrls,
        [fieldName]: fileUrl,
      }));
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
    }
  };

  console.log(fileUrls, " fhdfjdkfjkdj");
  const updateStudentData = async () => {
    try {
      const apiUrl = "http://localhost:7786/updatestudent";

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          personalFormData: formData,
          professionalFormData: formData1,
          addressFormData: formData2,
          educationFormData: formData3,
          fileUrls,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update student data");
      }

      const data = await response.json();
      console.log("Student data updated successfully:", data);
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="mericlass">
        <h1 style={{ marginLeft: "300px" }}>
          <b>University Enrollment Form </b>
        </h1>
        {/* <Container
          className="shadow p-3 bg-body rounded"
          style={{
            width: "100%",
            backgroundColor: "#e8e5d1",
            marginTop: "20px",
          }}
        >
          <div
            style={{
               backgroundColor: "skyblue",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <h5
              style={{
                padding: "10px",
                margin: 0,
               marginTop: "-3px",
               
              }}
            >
             <b> Personal Details</b>
            </h5>
          </div>

          <Grid container spacing={2} mt="5px">
            <Grid item xs={12} md={4}>
              <Form.Group controlId="name">
                <Form.Label>
                  <b>
                    Name <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={userData?.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>

            <Grid item xs={12} md={4}>
              <Form.Group controlId="father's name">
                <Form.Label>
                  <b>
                    Father's Name <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  value={userData?.fathersname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="father's name">
                <Form.Label>
                  <b>
                    Mother's Name <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  value={userData?.mothersname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="date of birth">
                <Form.Label>
                  <b>
                    Date of Birth <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="date"
                  value={userData?.dob}
                  onChange={handleChange}
                  name="date of birth"
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="gender">
                <Form.Label>
                  <b>
                    Gender <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="gender"
                  value={userData?.gender}
                  onChange={handleChange}
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="mobile">
                <Form.Label>
                  <b>
                    Mobile <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="mobile"
                  value={userData?.mobile}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="category">
                <Form.Label>
                  <b>
                    Category <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="category"
                  value={userData?.category}
                  onChange={handleChange}
                >
                  <option value="">--Select Category--</option>
                  <option value="Gen">Gen</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>

                  <option value="OBC">OBC</option>
                  <option value="Minority">Minority</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="email">
                <Form.Label>
                  <b>
                    Email <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData?.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="qualification">
                <Form.Label>
                  <b>
                    Qualification <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="qualification"
                  value={userData?.qualification}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="last exam passing year">
                <Form.Label>
                  <b>
                    Last Exam Passing Year{" "}
                    <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="last exam passing year"
                  value={userData?.lastExamPassingYear}
                  onChange={handleChange}
                >
                  <option value="">--Select Year--</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="passing year">
                <Form.Label>
                  <b>
                    Passing Year <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="passing year"
                  value={userData?.passingYear}
                  onChange={handleChange}
                >
                  <option value="">--Select Year--</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4} mb={7}>
              <Form.Group controlId="qualifying exam percentage">
                <Form.Label>
                  <b>
                    Qualifying Exam Percentage{" "}
                    <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="qualifying exam percentage"
                  value={userData?.qualifyingExamPercentage}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
          </Grid>
        </Container> */}

        <Container
          className="shadow p-3 bg-body rounded"
          style={{
            width: "95%", // Adjusted width
            backgroundColor: "#e8e5d1",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "skyblue",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <h5
              style={{
                padding: "10px",
                margin: 0,
                marginTop: "-3px",
              }}
            >
              <b> Personal Details</b>
            </h5>
          </div>

          <Grid container spacing={2} mt="5px">
            <Grid item xs={12} md={4}>
              <Form.Group controlId="name">
                <Form.Label>
                  <b>
                    Name <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={userData?.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>

            <Grid item xs={12} md={4}>
              <Form.Group controlId="father's name">
                <Form.Label>
                  <b>
                    Father's Name <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  value={userData?.fathersname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="father's name">
                <Form.Label>
                  <b>
                    Mother's Name <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  value={userData?.mothersname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="date of birth">
                <Form.Label>
                  <b>
                    Date of Birth <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="date"
                  value={userData?.dob}
                  onChange={handleChange}
                  name="date of birth"
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="gender">
                <Form.Label>
                  <b>
                    Gender <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="gender"
                  value={userData?.gender}
                  onChange={handleChange}
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="mobile">
                <Form.Label>
                  <b>
                    Mobile <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="mobile"
                  value={userData?.mobile}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="category">
                <Form.Label>
                  <b>
                    Category <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="category"
                  value={userData?.category}
                  onChange={handleChange}
                >
                  <option value="">--Select Category--</option>
                  <option value="Gen">Gen</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>

                  <option value="OBC">OBC</option>
                  <option value="Minority">Minority</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="email">
                <Form.Label>
                  <b>
                    Email <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData?.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="qualification">
                <Form.Label>
                  <b>
                    Qualification <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="qualification"
                  value={userData?.qualification}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="last exam passing year">
                <Form.Label>
                  <b>
                    Last Exam Passing Year{" "}
                    <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="last exam passing year"
                  value={userData?.lastExamPassingYear}
                  onChange={handleChange}
                >
                  <option value="">--Select Year--</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group controlId="passing year">
                <Form.Label>
                  <b>
                    Passing Year <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="passing year"
                  value={userData?.passingYear}
                  onChange={handleChange}
                >
                  <option value="">--Select Year--</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4} mb={7}>
              <Form.Group controlId="qualifying exam percentage">
                <Form.Label>
                  <b>
                    Qualifying Exam Percentage{" "}
                    <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="qualifying exam percentage"
                  value={userData?.qualifyingExamPercentage}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid>
          </Grid>
        </Container>

        {/* //////////////////////////////////PROFESSIONAL DETAILS/////////////////////////////////////////////////////////////////////////////// */}
        {/* <Container
          className="shadow p-3  bg-body rounded"
          style={{
            width: "100%",
            backgroundColor: "#e8e5d1",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "skyblue",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <h5 style={{ padding: "10px", margin: 0, marginTop: "-3px" }}>
              <b> Professional Details</b>
            </h5>
          </div>
          <br></br>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="Handicapped">
                <Form.Label>
                  <b>
                    Handicapped <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="Handicapped"
                  value={formData1.Handicapped}
                  onChange={handleChange2}
                >
                  <option value="">--Select Please--</option>
                  <option value="Yes">YES</option>
                  <option value="No">NO</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="Medium">
                <Form.Label>
                  <b>
                    Medium <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="Medium"
                  value={formData1.Medium}
                  onChange={handleChange2}
                >
                  <option value="">--Select Medium--</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="Nationality">
                <Form.Label>
                  <b>
                    Nationality <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="Nationality"
                  value={formData1.Nationality}
                  onChange={handleChange2}
                >
                  <option value="">-- Select Nationality--</option>
                  <option value="1">Indian</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="Domicile">
                <Form.Label>
                  <b>
                    Domicile <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  name="Domicile"
                  value={formData1.Domicile}
                  onChange={handleChange2}
                >
                  <option value="">--Select Domicile --</option>
                  <option value="MP">MP</option>
                  <option value="Other">Other </option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="ScholarshipRequired">
                <Form.Label>
                  <b>
                    Scholarship Required{" "}
                    <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  name="ScholarshipRequired"
                  value={formData1.ScholarshipRequired}
                  onChange={handleChange2}
                >
                  <option value="">--Select Please--</option>
                  <option value="Yes">YES</option>
                  <option value="No">NO</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="FathersOccupation">
                <Form.Label>
                  <b>
                    Father's Occupation <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="FathersOccupation"
                  value={formData1.FathersOccupation}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="MothersOccupation">
                <Form.Label>
                  <b>
                    Mother's Occupation <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="MothersOccupation"
                  value={formData1.MothersOccupation}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="FathersIncome">
                <Form.Label>
                  <b>
                    Father's Income <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="FathersIncome"
                  value={formData1.FathersIncome}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="MothersIncome">
                <Form.Label>
                  <b>
                    Mother's Income <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="MothersIncome"
                  value={formData1.MothersIncome}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="SamagraId">
                <Form.Label>
                  <b>
                    Samagra Id <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="SamagraId"
                  value={formData1.SamagraId}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="AadharNumber">
                <Form.Label>
                  <b>Aadhar Number*</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="AadharNumber"
                  value={formData1.AadharNumber}
                  onChange={handleChange2}
                  placeholder="0000-0000-0000"
                  required
                />
              </Form.Group>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="ParentMobile">
                <Form.Label>
                  <b>
                    Parent Mobile <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="ParentMobile"
                  value={formData1.ParentMobile}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>
          </Grid>
        </Container> */}
  
        <Container
          className="shadow p-3 bg-body rounded"
          style={{
            width: "95%", // Adjusted width
            backgroundColor: "#e8e5d1",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "skyblue",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <h5
              style={{
                padding: "10px",
                margin: 0,
                marginTop: "-3px",
              }}
            >
              <b> Personal Details</b>
            </h5>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="Handicapped">
                <Form.Label>
                  <b>
                    Handicapped <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="Handicapped"
                  value={formData1.Handicapped}
                  onChange={handleChange2}
                >
                  <option value="">--Select Please--</option>
                  <option value="Yes">YES</option>
                  <option value="No">NO</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="Medium">
                <Form.Label>
                  <b>
                    Medium <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="Medium"
                  value={formData1.Medium}
                  onChange={handleChange2}
                >
                  <option value="">--Select Medium--</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form.Group className="mb-3" controlId="Nationality">
                <Form.Label>
                  <b>
                    Nationality <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="Nationality"
                  value={formData1.Nationality}
                  onChange={handleChange2}
                >
                  <option value="">-- Select Nationality--</option>
                  <option value="1">Indian</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="Domicile">
                <Form.Label>
                  <b>
                    Domicile <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  name="Domicile"
                  value={formData1.Domicile}
                  onChange={handleChange2}
                >
                  <option value="">--Select Domicile --</option>
                  <option value="MP">MP</option>
                  <option value="Other">Other </option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="ScholarshipRequired">
                <Form.Label>
                  <b>
                    Scholarship Required{" "}
                    <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Select
                  name="ScholarshipRequired"
                  value={formData1.ScholarshipRequired}
                  onChange={handleChange2}
                >
                  <option value="">--Select Please--</option>
                  <option value="Yes">YES</option>
                  <option value="No">NO</option>
                </Form.Select>
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="FathersOccupation">
                <Form.Label>
                  <b>
                    Father's Occupation <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="FathersOccupation"
                  value={formData1.FathersOccupation}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="MothersOccupation">
                <Form.Label>
                  <b>
                    Mother's Occupation <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="MothersOccupation"
                  value={formData1.MothersOccupation}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="FathersIncome">
                <Form.Label>
                  <b>
                    Father's Income <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="FathersIncome"
                  value={formData1.FathersIncome}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="MothersIncome">
                <Form.Label>
                  <b>
                    Mother's Income <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="MothersIncome"
                  value={formData1.MothersIncome}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="SamagraId">
                <Form.Label>
                  <b>
                    Samagra Id <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="SamagraId"
                  value={formData1.SamagraId}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="AadharNumber">
                <Form.Label>
                  <b>Aadhar Number*</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="AadharNumber"
                  value={formData1.AadharNumber}
                  onChange={handleChange2}
                  placeholder="0000-0000-0000"
                  required
                />
              </Form.Group>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              //   mt={2}
            >
              <Form.Group className="mb-3" controlId="ParentMobile">
                <Form.Label>
                  <b>
                    Parent Mobile <span style={{ color: "red" }}> *</span>
                  </b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="ParentMobile"
                  value={formData1.ParentMobile}
                  onChange={handleChange2}
                  required
                />
              </Form.Group>
            </Grid>
          </Grid>
        </Container>


        

        {/* ////////////////////////////////////////////////////ADDRESS DETAILS////////////////////////////////////////////////////////////////////////////////// */}
          {/* <Container
            className="shadow p-3 bg-body rounded"
            style={{
              width: "100%",
              backgroundColor: "#e8e5d1",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "skyblue",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <h5 style={{ padding: "10px", margin: 0, marginTop: "-3px" }}>
                <b>Address Details</b>
              </h5>
            </div>

            <Grid container spacing={2} mt="5px">
              <Grid item xs={12} md={6}>
                <Form.Group controlId="address1">
                  <Form.Label>
                    <b>
                      Address1 <span style={{ color: "red" }}> *</span>
                    </b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address1"
                    value={formData2.address1}
                    onChange={handleChange4}
                    required
                    placeholder="House No, Street No or Road No"
                  />
                </Form.Group>
              </Grid>
              <Grid item xs={12} md={6}>
                <Form.Group controlId="address2">
                  <Form.Label>
                    <b>
                      Address2 <span style={{ color: "red" }}> *</span>
                    </b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address2"
                    value={formData2.address2}
                    onChange={handleChange4}
                    required
                    placeholder="Colony, Ward, Village, City"
                  />
                </Form.Group>
              </Grid>
              <Grid item xs={12} md={6}>
                <Form.Group controlId="country">
                  <Form.Label>
                    <b>
                      Country <span style={{ color: "red" }}> *</span>
                    </b>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="country"
                    value={formData2.country}
                    onChange={handleChange4}
                  >
                    <option value="">--Select Please--</option>
                    <option value="India">INDIA</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Grid>
              <Grid item xs={12} md={6}>
                <Form.Group className="mb-3" controlId="State">
                  <Form.Label>
                    <b>
                      State <span style={{ color: "red" }}> *</span>
                    </b>
                  </Form.Label>
                  <select
                    className="form-select"
                    id="inputState"
                    // value={formData2.state}
                    onChange={handleStateChange}
                  >
                    <option value="">Select state</option>
                    {states.map((item, index) => (
                      <option key={index} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </Grid>
              <Grid item xs={12} md={6}>
                <Form.Group controlId="district">
                  <Form.Label>
                    <b>
                      District <span style={{ color: "red" }}> *</span>
                    </b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="district"
                    required
                    value={formData2.district}
                    onChange={handleChange4}
                  />
                </Form.Group>
              </Grid>
              <Grid item xs={12} md={6}>
                <Form.Group controlId="pincode">
                  <Form.Label>
                    <b>
                      Pin Code <span style={{ color: "red" }}> *</span>
                    </b>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="pincode"
                    value={formData2.pincode}
                    onChange={handleChange4}
                    required
                  />
                </Form.Group>
              </Grid>
            </Grid>
          </Container> */}

        {/* /////////////////////////////////////////////////ACADEMIC DETAILS///////////////////////////////////// */}
        <Container
          className="shadow p-3 mb-3 bg-body rounded"
          style={{
    width: "95%",  // Adjusted width
    backgroundColor: "#e8e5d1",
    marginTop: "20px",
  }}
        >
          <div
            style={{
              backgroundColor: "skyblue",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <h5 style={{ padding: "10px", margin: 0, marginTop: "-3px" }}>
              <b> Academic Details</b>
            </h5>
          </div>
          <br></br>

          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: "440px" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{ backgroundColor: "#e6ecf0" }}
                    >
                      <h5>
                        <b>Exam </b>
                      </h5>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ backgroundColor: "#e6ecf0" }}
                    >
                      <h5>
                        <b>School/College</b>
                      </h5>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ backgroundColor: "#e6ecf0" }}
                    >
                      <h5>
                        <b>Passing Year</b>
                      </h5>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ backgroundColor: "#e6ecf0" }}
                    >
                      <h5>
                        <b>Roll No</b>
                      </h5>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ backgroundColor: "#e6ecf0" }}
                    >
                      <h5>
                        <b>Name of Board/University</b>
                      </h5>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ backgroundColor: "#e6ecf0" }}
                    >
                      <h5>
                        <b>Exam Type</b>
                      </h5>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ backgroundColor: "#e6ecf0" }}
                    >
                      <h5>
                        <b>Marks Obtain</b>
                      </h5>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ backgroundColor: "#e6ecf0" }}
                    >
                      <h5>
                        <b>Max Marks</b>
                      </h5>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ backgroundColor: "#e6ecf0" }}
                    >
                      <h5>
                        <b>%Age</b>
                      </h5>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">10th</TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name="tenthSchool"
                        value={formData3.tenthSchool}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="tenthPassingYear"
                        value={formData3.tenthPassingYear}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "180px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="tenthRollNo"
                        value={formData3.tenthRollNo}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "200px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="tenthBoard"
                        value={formData3.tenthBoard}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <Form.Select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      >
                        <option value="">--Select--</option>
                        <option value="Non Grading">Non Grading</option>
                        <option value="Others">Other Option</option>
                      </Form.Select>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="tenthExamType"
                        value={formData3.tenthExamType}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "80px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="tenthMarksObtain"
                        value={formData3.tenthMarksObtain}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "80px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="tenthPercentage"
                        value={formData3.tenthPercentage}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "180px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="left">12th/Diploma</TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name="twelfthSchool"
                        value={formData3.twelfthSchool}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name=" twelfthPassingYear"
                        value={formData3.twelfthPassingYear}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "180px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="twelfthRollNo"
                        value={formData3.twelfthRollNo}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "200px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name=" twelfthBoard"
                        value={formData3.twelfthBoard}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <Form.Select>
                        <option value="">--Select--</option>
                        <option value="1">Non Grading</option>
                        <option value="2">Other Option</option>
                      </Form.Select>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="twelfthMarksObtain"
                        value={formData3.twelfthMarksObtain}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "80px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name=" twelfthMaxMarks"
                        value={formData3.twelfthMaxMarks}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "80px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="twelfthPercentage"
                        value={formData3.twelfthPercentage}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "180px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Graduation</TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name=" graduationCollege"
                        value={formData3.graduationCollege}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="graduationPassingYear"
                        value={formData3.graduationPassingYear}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "180px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="graduationRollNol"
                        value={formData3.graduationRollNo}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "200px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="graduationUniversity"
                        value={formData3.graduationUniversity}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <Form.Select>
                        <option value="">--Select--</option>
                        <option value="1">Non Grading</option>
                        <option value="2">Other Option</option>
                      </Form.Select>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name=" graduationExamType"
                        value={formData3.graduationExamType}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "80px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name=" graduationMarksObtain"
                        value={formData3.graduationMarksObtain}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "80px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="graduationMaxMarks"
                        value={formData3.graduationMaxMarks}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "180px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="left">Post Graduation</TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name="postGraduationCollege"
                        value={formData3.postGraduationCollege}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name="postGraduationPassingYear"
                        value={formData3.postGraduationPassingYear}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "180px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name="postGraduationRollNo"
                        value={formData3.postGraduationRollNo}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "200px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name="postGraduationUniversity"
                        value={formData3.postGraduationUniversity}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>

                    <TableCell align="left">
                      <Form.Select>
                        <option value="">--Select--</option>
                        <option value="1">Non Grading</option>
                        <option value="2">Other Option</option>
                      </Form.Select>
                    </TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name="postGraduationMarksObtain"
                        value={formData3.postGraduationMarksObtain}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "80px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name="postGraduationMaxMarks"
                        value={formData3.postGraduationMaxMarks}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "80px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name="postGraduationPercentage"
                        value={formData3.postGraduationPercentage}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "180px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="left">Other</TableCell>

                    <TableCell align="left">
                      <input
                        type="text"
                        name="otherSchool"
                        value={formData3.otherSchool}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="otherPassingYear"
                        value={formData3.otherPassingYear}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "180px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="otherRollNo"
                        value={formData3.otherRollNo}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "200px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="otherBoard"
                        value={formData3.otherBoard}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="otherExamType"
                        value={formData3.otherExamType}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "150px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="otherMarksObtain"
                        value={formData3.otherMarksObtain}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "80px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="otherMaxMarks"
                        value={formData3.otherMaxMarks}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "80px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        type="text"
                        name="otherPercentage"
                        value={formData3.otherPercentage}
                        onChange={handleChange3}
                        style={{
                          borderRadius: "5px",
                          width: "180px",
                          height: "50px",
                        }}
                      ></input>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={2} // Replace with the actual count of your data
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>

        {/* /////////////////////////////////////////////DOCUMENTS & PHOTOS/////////////////////////////////////////// */}
        {/* <Container
          className="shadow p-3 bg-body rounded"
          style={{
            width: "100%",
            backgroundColor: "#e8e5d1",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "skyblue",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <h5 style={{ padding: "10px", margin: 0, marginTop: "-3px" }}>
              <b> Documents & Signature</b>
            </h5>
          </div>
          <br></br>

          <Grid container>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>
                    Applicant's Photo <span style={{ color: "red" }}> *</span>
                  </h5>
                </div>

                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("applicantPhoto", e)}
                  ></input>
                  <h6 style={{ backgroundColor: "#ffe6e6" }}>Maximum 1000KB</h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>
                    Applicant's Signature{" "}
                    <span style={{ color: "red" }}> *</span>
                  </h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("applicantSignature", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>
                    Aadhar Card <span style={{ color: "red" }}> *</span>
                  </h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange(" aadharCard", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Marksheet of 10th Examination</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("marksheet10th", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Marksheet of 12th Examination</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("marksheet12th", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Under Graduate Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) =>
                      handleFileChange("undergraduateCertificate", e)
                    }
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Post Graduate Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) =>
                      handleFileChange("postgraduateCertificate", e)
                    }
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Domicile Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("domicileCertificate", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Transfer Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("transferCertificate", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Income Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("incomeCertificate", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Migration Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) =>
                      handleFileChange("migrationCertificate", e)
                    }
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Other Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("otherCertificate", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>
          </Grid>
        </Container> */}

        <Container
  className="shadow p-3 bg-body rounded"
  style={{
    width: "95%",  // Adjusted width
    backgroundColor: "#e8e5d1",
    marginTop: "20px",
  }}
>
  <div
    style={{
      backgroundColor: "skyblue",
      width: "100%",
      borderRadius: "10px",
    }}
  >
    <h5
      style={{
        padding: "10px",
        margin: 0,
        marginTop: "-3px",
      }}
    >
      <b> Personal Details</b>
    </h5>
  </div>

  <Grid container spacing={2} mt="5px">
    {/* ... (rest of your code) ... */}
  
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>
                    Applicant's Photo <span style={{ color: "red" }}> *</span>
                  </h5>
                </div>

                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("applicantPhoto", e)}
                  ></input>
                  <h6 style={{ backgroundColor: "#ffe6e6" }}>Maximum 1000KB</h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>
                    Applicant's Signature{" "}
                    <span style={{ color: "red" }}> *</span>
                  </h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("applicantSignature", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>
                    Aadhar Card <span style={{ color: "red" }}> *</span>
                  </h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange(" aadharCard", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Marksheet of 10th Examination</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("marksheet10th", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Marksheet of 12th Examination</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("marksheet12th", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Under Graduate Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) =>
                      handleFileChange("undergraduateCertificate", e)
                    }
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Post Graduate Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) =>
                      handleFileChange("postgraduateCertificate", e)
                    }
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Domicile Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("domicileCertificate", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Transfer Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("transferCertificate", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Income Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("incomeCertificate", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Migration Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) =>
                      handleFileChange("migrationCertificate", e)
                    }
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <h5>Other Certificate</h5>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    placeholder="choose"
                    onChange={(e) => handleFileChange("otherCertificate", e)}
                  ></input>
                  <h6 style={{ backgroundColor: " #ffe6e6" }}>
                    Maximum 1000KB
                  </h6>
                </div>
              </div>
              <hr></hr>
            </Grid>
          </Grid>


</Container>

        
        




        <br></br>
        <Button style={{ marginLeft: "400px", width: "120px" }}>Submit</Button>

        <br></br>
        <br></br>
      </div>

      {/*<div className="button-container mericlass">

       <Link to="/personal">
          <Button>Personal</Button>
        </Link>
        <Link to="/professional">
          <Button>Professional</Button>
        </Link>
        <Link to="/address">
          <Button>Address</Button>
        </Link>
        <Link to="/academic">
          <Button>Academic</Button>
        </Link>
        <Link to="/photo">
          <Button>Photo & Signature</Button>
  </Link>
      </div>*/}
    </>
  );
};

export default ButtonFun;
